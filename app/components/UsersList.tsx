import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { LatestMessage, ProfileImage, UserListEmpty } from '../components';
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
import { convertToTimestamp, getChatTime } from '../services';
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

        conversations?.forEach(conversation => {
          conversationIds.push(conversation?.id);
        });

        if (conversationIds.length !== 0) {
          const userListData: Promise<UserListDataType[]> = new Promise(
            resolve => {
              conversationIds?.forEach(async (conversationId: string) => {
                appConstants.conversationRef
                  .doc(conversationId)
                  .onSnapshot(async conversation => {
                    if (conversation.exists) {
                      const conversationData = conversation?.data();
                      const members: UserDataType[] = conversationData?.members;
                      const groupName = conversationData?.groupName;
                      const userInfo = Object.values(members)?.filter(
                        item => item?.uid !== user?.uid,
                      )?.[0];
                      const groupInfo = {
                        members,
                        groupName,
                        createdBy: conversationData?.createdBy,
                        groupImage: conversationData?.groupImage,
                      };
                      const conversationInfo = groupName ? groupInfo : userInfo;
                      const users = {
                        ...conversationInfo,
                        latestMessage: conversationData?.latestMessage,
                        conversationId: conversationData?.conversationId,
                        groupInitializerId:
                          conversationData?.groupInitializerId,
                        updatedAt: convertToTimestamp(
                          conversationData?.updatedAt,
                        ),
                        createdAt: convertToTimestamp(
                          conversationData?.createdAt,
                        ),
                      };

                      const userIndex = conversationsList.findIndex(
                        conversationUser => {
                          return (
                            conversationUser?.conversationId ===
                            users?.conversationId
                          );
                        },
                      );

                      if (userIndex !== -1) {
                        conversationsList[userIndex] = users;
                      } else {
                        conversationsList.push(users);
                      }

                      if (conversationIds.length === conversationsList.length) {
                        resolve(conversationsList);

                        userListData
                          .then(conversationsUser => {
                            conversationsUser?.sort(
                              (previosData, currentData) => {
                                return previosData?.updatedAt === 0
                                  ? currentData?.updatedAt
                                  : currentData?.updatedAt -
                                      previosData?.updatedAt;
                              },
                            );

                            dispatch(
                              userListDataAction.userListRequest(
                                conversationsUser,
                              ),
                            );
                          })
                          .catch(error => error);
                      }
                    }
                  });
              });
            },
          );
        } else {
          dispatch(userListDataAction.userListRequest(appConstants.emptyArray));
        }
      });
  }, [dispatch, user]);

  useFocusEffect(
    useCallback(() => {
      const sub = getUserList();
      return () => sub;
    }, [getUserList]),
  );

  const renderUserList = (item: UserListDataType) => {
    const conversationId = item?.conversationId;
    const message = item?.latestMessage;
    const userStatus = item?.status;
    const groupName = item?.groupName;
    const time = getChatTime(item?.updatedAt);
    const profileImage = item?.profileImage ?? item?.groupImage;
    const conversationName = groupName ? groupName : item?.username;

    const navigateToChatScreen = () => {
      const data = groupName
        ? { members: item?.members }
        : { receiverId: item?.uid, userStatus };

      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        groupName,
        username: conversationName,
        ...data,
        profileImage,
      });
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={navigateToChatScreen}
        activeOpacity={0.5}>
        <View style={styles.avatarGroup}>
          <ProfileImage {...{ groupName, profileImage, userStatus }} />
          <View style={styles.nameView}>
            <Text style={styles.text}>{conversationName}</Text>
            <LatestMessage
              {...{ message }}
              userId={user?.uid ?? ''}
              groupInitializerId={item?.groupInitializerId}
              createdBy={item?.createdBy}
            />
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
      ListEmptyComponent={
        <UserListEmpty
          fetching={fetchingUserList}
          userListLength={userList.length}
        />
      }
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default UsersList;
