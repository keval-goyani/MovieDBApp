import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { UserListEmpty } from '../components';
import {
  appConstants,
  navigationStrings,
  strings,
  UserDataType,
  UserListDataType,
  UserToChatNavigationDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import userListDataAction, {
  chatUserListSelector,
} from '../redux/ChatUserListRedux';
import {
  conversationIdCreation,
  convertToTimestamp,
  getChatTime,
} from '../services';
import { Icons } from '../theme';
import { styles } from './styles/UsersListStyles';

const UsersList = () => {
  const navigation: UserToChatNavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { userList, fetchingUserList } = useSelector(
    chatUserListSelector.getData,
  );

  const getUserList = useCallback(() => {
    appConstants.chatRef
      .doc(user?.uid)
      .collection(strings.conversationsCollection)
      .onSnapshot(conversations => {
        let conversationIds: string[] = [];
        let conversationsList: UserListDataType[] = [];

        conversations.forEach(conversation => {
          conversationIds.push(conversation?.id);
        });

        const userListData: Promise<UserListDataType[]> = new Promise(
          resolve => {
            conversationIds?.forEach(async (conversationId: string) => {
              appConstants.conversationRef
                .doc(conversationId)
                .onSnapshot(async conversationData => {
                  const members: UserDataType[] = await conversationData?.data()
                    ?.members;
                  const latestMessage = await conversationData?.data()
                    ?.latestMessage;
                  const createdAt = convertToTimestamp(
                    await conversationData?.data()?.createdAt,
                  );
                  const userData = Object.values(members).filter(
                    item => item?.uid !== user?.uid,
                  )?.[0];
                  const users = { ...userData, latestMessage, createdAt };
                  const userIndex = conversationsList.findIndex(
                    conversationUser => {
                      return conversationUser?.uid === users?.uid;
                    },
                  );

                  if (userIndex !== -1) {
                    conversationsList[userIndex] = users;
                  } else {
                    conversationsList.push(users);
                  }

                  if (conversationIds.length === conversationsList.length) {
                    resolve(conversationsList);

                    userListData.then(conversationsUser => {
                      conversationsUser.sort((a, b) => {
                        return a?.createdAt === 0
                          ? b?.createdAt
                          : b?.createdAt - a?.createdAt;
                      });

                      dispatch(
                        userListDataAction.userListRequest(conversationsUser),
                      );
                    });
                  }
                });
            });
          },
        );
      });
  }, [dispatch, user]);

  useFocusEffect(
    useCallback(() => {
      const sub = getUserList();
      return () => sub;
    }, [getUserList]),
  );

  const renderUserList = (item: UserListDataType) => {
    const conversationId: string = conversationIdCreation(
      user?.email ?? '',
      item?.email,
    );
    const message = item?.latestMessage;
    const chatUsername =
      item?.uid !== message?.senderId
        ? `${strings.you}: ${message?.content}`
        : `${message?.content}`;
    const latestMessage = message?.content
      ? chatUsername
      : `${strings.startConversation}`;
    const time = getChatTime(item?.createdAt);

    const navigateToChatScreen = () => {
      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        username: item?.username,
        receiverId: item?.uid,
      });
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={navigateToChatScreen}
        activeOpacity={0.5}>
        <View style={styles.avatarGroup}>
          <Image source={Icons.avatar} style={styles.avatar} />
          <View style={styles.nameView}>
            <Text style={styles.text}>{item?.username}</Text>
            <Text
              style={styles.lastChatText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {latestMessage}
            </Text>
          </View>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={asMutable(userList)}
      renderItem={({ item }) => renderUserList(item)}
      ListEmptyComponent={<UserListEmpty fetching={fetchingUserList} />}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default UsersList;
