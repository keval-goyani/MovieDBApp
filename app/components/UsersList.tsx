import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { Icons } from '../assets';
import { UserListEmpty } from '../components';
import {
  ChatDataType,
  ChatListDataType,
  LatestMessageDataType,
  NavigationDataType,
  navigationStrings,
  strings,
  UserListDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import chatAction from '../redux/ChatRedux';
import userListDataAction, {
  chatUserListSelector,
} from '../redux/ChatUserListRedux';
import { getChatTime, sortString } from '../services';
import { styles } from './styles/UsersListStyles';

const UsersList = () => {
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { userList, fetchingUserList } = useSelector(
    chatUserListSelector.getData,
  );

  const userListCombiner = (
    fireStoreUserList: ChatListDataType[],
    fireStoreChatList: LatestMessageDataType[],
  ) => {
    return fireStoreUserList.map((item, index: number) => {
      if (item?.uid === fireStoreChatList?.[index]?.userId) {
        return { ...item, ...fireStoreChatList?.[index] };
      } else {
        return item;
      }
    });
  };

  const fetchingLastMessage = (chatId: string, uid: string) => {
    return new Promise(resolve => {
      firestore()
        .collection(strings.chatCollection)
        .doc(chatId)
        .onSnapshot(chatDocument => {
          const messageList: ChatDataType[] =
            chatDocument?.data()?.messageList ?? [];

          resolve({
            content: messageList[messageList?.length - 1]?.content ?? '',
            time: messageList[messageList?.length - 1]?.time ?? 0,
            senderId: messageList[messageList?.length - 1]?.user ?? '',
            userId: uid ?? '',
          });
        });
    });
  };

  const fetchingUser = useCallback(() => {
    const fireStoreUserList: ChatListDataType[] = [];
    const fireStoreChatList: LatestMessageDataType[] = [];

    firestore()
      .collection(strings.chatUsers)
      .onSnapshot(userSnapshot => {
        userSnapshot.forEach(userDocument => {
          const concatId = user?.uid + userDocument.data().uid;
          const chatId: string = sortString(concatId);

          if (userDocument?.data().uid !== user?.uid) {
            fireStoreUserList.push(userDocument?.data());
          }
          userDocument?.data().uid !== user?.uid &&
            fireStoreChatList.push(
              fetchingLastMessage(chatId, userDocument.data().uid),
            );
        });

        Promise.all(fireStoreChatList).then(chatDataResponse => {
          const chatUserList = userListCombiner(
            fireStoreUserList,
            chatDataResponse,
          );
          const uniqueData = [
            ...new Map(chatUserList.map(item => [item.uid, item])).values(),
          ];

          uniqueData.sort((a, b) => {
            return a.time === 0 ? b.time : b.time - a.time;
          });
          dispatch(userListDataAction.userListSuccess(uniqueData));
        });
      });
  }, [dispatch, user]);

  useFocusEffect(
    useCallback(() => {
      const sub = fetchingUser();
      return () => sub;
    }, [fetchingUser]),
  );

  const renderUserList = (item: UserListDataType) => {
    const concatId = user?.uid + item?.uid;
    const chatId: string = sortString(concatId);
    const chatUsername =
      item?.uid !== item?.senderId
        ? `${strings.you}${item?.content}`
        : `${item?.username}: ${item?.content}`;
    const latestMessage = item?.content
      ? chatUsername
      : `${strings.startConversation}`;
    const time = getChatTime(item?.time);

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          navigation.navigate(navigationStrings.Chat, {
            chatId,
            username: item?.username,
          });
          dispatch(chatAction.chatDataRequest(chatId));
        }}
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
