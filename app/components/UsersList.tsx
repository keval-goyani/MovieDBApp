import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { UserListEmpty } from '../components';
import {
  appConstants,
  ChatDataType,
  ChatListDataType,
  LatestMessageDataType,
  NavigationDataType,
  navigationStrings,
  strings,
  UserListDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import chatAction, { chatDataSelector } from '../redux/ChatRedux';
import userListDataAction, {
  chatUserListSelector,
} from '../redux/ChatUserListRedux';
import { chatIdCreation, getChatTime } from '../services';
import { Icons } from '../theme';
import { styles } from './styles/UsersListStyles';

interface UserToChatNavigationDataType {
  navigate: (
    screen: string,
    params: {
      chatId: string;
      username: string;
      receiverId: string;
    },
  ) => void;
}

const UsersList = () => {
  const navigation: UserToChatNavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { userList, fetchingUserList } = useSelector(
    chatUserListSelector.getData,
  );
  // const { chatData } = useSelector(chatDataSelector.getData);
  // const message = chatData?.[chatData?.length - 1]?.content;

  // const [user, setUser] = useState()
  // const fireStoreUserList: ChatListDataType[] = [];

  // const userListCombiner = (
  //   fireStoreUserList: ChatListDataType[],
  //   fireStoreChatList: LatestMessageDataType[],
  // ) => {
  //   return fireStoreUserList.map((item, index: number) => {
  //     if (item?.uid === fireStoreChatList?.[index]?.userId) {
  //       return { ...item, ...fireStoreChatList?.[index] };
  //     } else {
  //       return item;
  //     }
  //   });
  // };

  // const fetchingLastMessage = (chatId: string, uid: string) => {
  //   return new Promise(resolve => {
  //     firestore()
  //       .collection(strings.chatCollection)
  //       .doc(chatId)
  //       .onSnapshot(chatDocument => {
  //         const messageList: ChatDataType[] =
  //           chatDocument?.data()?.messageList ?? [];

  //         resolve({
  //           content: messageList[messageList?.length - 1]?.content ?? '',
  //           time: messageList[messageList?.length - 1]?.time ?? 0,
  //           senderId: messageList[messageList?.length - 1]?.user ?? '',
  //           userId: uid ?? '',
  //         });
  //       });
  //   });
  // };

  /** Vikrant Bhai Solution
  // const addLastMessage = async (
  //   senderId: string,
  //   receiverId: string,
  //   userData,
  // ) => {
  //   return await appConstants.chatUserRef
  //     .doc(senderId)
  //     .collection(strings.lastMessageCollection)
  //     .doc(receiverId)
  //     .get()
  //     .then(lastMessage => {
  //       return { ...lastMessage?.data(), user: userData };
  //     });
  // };

  // const getMessage = () => {
  //   return new Promise((resolve, reject) => {
  //     appConstants.chatUserRef.onSnapshot(async userSnapshot => {
  //       let fireStoreUserList: any = [];
  //       try {
  //         userSnapshot.forEach(async userDocument => {
  //           if (userDocument?.data()?.uid !== user?.uid) {
  //             const userData = userDocument?.data();

  //             const lastMessage = await addLastMessage(
  //               user?.uid ?? '',
  //               userDocument?.data()?.uid,
  //               userData,
  //             );

  //             fireStoreUserList.push(lastMessage);
  //           }
  //         });
  //         resolve(fireStoreUserList);
  //       } finally {
  //         reject([]);
  //       }
  //     });
  //   });
  // };

  // const fetchingUser = () => {
  //   getMessage()
  //     .then(result => {
  //       console.log('result', result);
  //       Promise.all(result)
  //         .then(message => {
  //           console.log('message', message);
  //         })
  //         .catch(e => {
  //           console.log('message e', e);
  //         });
  //     })
  //     .catch(e => {
  //       console.log('e', e);
  //     });
  //   // dispatch(userListDataAction.userListRequest(fireStoreUserList));
  // };
*/

  const addLastMessage = async (senderId: string, receiverId: string) => {
    return await appConstants.chatUserRef
      .doc(senderId)
      .collection(strings.lastMessageCollection)
      .doc(receiverId)
      .get()
      .then(lastMessage => {
        return lastMessage?.data();
      });
  };

  const fetchingUser = useCallback(async () => {
    appConstants.chatUserRef.onSnapshot(userSnapshot => {
      let fireStoreUserList: any = [];
      userSnapshot.forEach(async (userDocument: any) => {
        if (userDocument?.data()?.uid !== user?.uid) {
          const userData = userDocument?.data();

          // const lastMessage = await addLastMessage(
          //   user?.uid ?? '',
          //   userDocument?.data()?.uid,
          // );
          // console.log(lastMessage, '>>===lastMessage');

          fireStoreUserList.push(userData);
        }
      });

      dispatch(userListDataAction.userListRequest(fireStoreUserList));
    });
  }, [dispatch, user?.uid]);

  useFocusEffect(
    useCallback(() => {
      const sub = fetchingUser();
      return () => sub;
    }, [fetchingUser]),
  );
  // const addLastMessage = async (
  //   senderId: string,
  //   receiverId: string,
  //   userData,
  // ) => {
  //   return await appConstants.chatUserRef
  //     .doc(senderId)
  //     .collection(strings.lastMessageCollection)
  //     .doc(receiverId)
  //     .get()
  //     .then(lastMessage => {
  //       return { ...lastMessage?.data(), user: userData };
  //     });
  // };

  // const fetchingLastMessage = useCallback(() => {
  //   const x = [];
  //   userList.map(userData => {
  //     addLastMessage(user?.uid ?? '', userData.uid).then(res => {
  //       // console.log(res);
  //       x.push({ ...userData, ...res });
  //     });
  //     console.log(x, '<====Data');
  //   });
  // }, [user, userList]);

  // useEffect(() => {
  //   fetchingLastMessage();
  // }, [fetchingLastMessage]);

  const renderUserList = (item: UserListDataType) => {
    const chatId: string = chatIdCreation(user?.uid ?? '', item?.uid);
    const chatUsername =
      item?.uid !== item?.senderId
        ? `${strings.you}: ${item?.content}`
        : `${item?.username}: ${item?.content}`;
    const latestMessage = item?.content
      ? chatUsername
      : `${strings.startConversation}`;
    const time = getChatTime(item?.time ?? 0);
    // console.log(item?.uid, 'iddff');

    // const lastMessage = await addLastMessage(user?.uid ?? '', item?.uid);
    // console.log(item?.content, 'Message');

    const navigateToChatScreen = () => {
      navigation.navigate(navigationStrings.Chat, {
        chatId,
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
