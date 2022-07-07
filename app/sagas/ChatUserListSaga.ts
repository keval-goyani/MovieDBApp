import { eventChannel } from 'redux-saga';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  AuthDataType,
  ChatListSagaDataType,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import userListDataAction, { UserListType } from '../redux/ChatUserListRedux';

// function* appendLastMessage(userList: any) {
//   console.log(userList, 'userList');
//   const x: any = [];

//   yield userList.map((item: any) => {
//     // console.log(item.uid);
//     appConstants.chatUserRef
//       .doc('KVYMKFFW7BhJT5fOBwyHViplgeT2')
//       .collection(strings.lastMessageCollection)
//       .doc(item.uid)
//       .get()
//       .then(lastMessage => {
//         // console.log(lastMessage?.data(), 'last');
//         x.push({ ...item, ...lastMessage?.data() });
//       });
//   });
//   console.log(x);
//   return x;
//   //   return eventChannel(emitter => {
//   //     const x: any = [];

//   //     userList.map((item: any) => {
//   //       // console.log(item.uid);
//   //       appConstants.chatUserRef
//   //         .doc('KVYMKFFW7BhJT5fOBwyHViplgeT2')
//   //         .collection(strings.lastMessageCollection)
//   //         .doc(item.uid)
//   //         .get()
//   //         .then(lastMessage => {
//   //           // console.log(lastMessage?.data(), 'last');
//   //           x.push({ ...item, ...lastMessage?.data() });
//   //         });
//   //     });
//   //     console.log(x, '<===x');

//   //     emitter(x);
//   //     return () => {
//   //       console.log('end');
//   //     };
//   //   });
//   // }

//   // function countdown(secs) {
//   //   return eventChannel(emitter => {
//   //     const iv = setInterval(() => {
//   //       secs -= 1;
//   //       if (secs > 0) {
//   //         emitter(secs);
//   //       } else {
//   //         // this causes the channel to close
//   //         emitter(END);
//   //       }
//   //     }, 1000);
//   //     // The subscriber must return an unsubscribe function
//   //     return () => {
//   //       emitter(END);
//   //     };
//   //   });
// }

// async function addLastMessage(
//   senderId: string,
//   receiverId: string,
//   userData: any,
// ) {
//   return await appConstants.chatUserRef
//     .doc(senderId)
//     .collection(strings.lastMessageCollection)
//     .doc(receiverId)
//     .get()
//     .then(lastMessage => {
//       return { ...userData, ...lastMessage?.data() };
//     });
// }
function* addLastMessage(senderId: string) {
  const lastMessage: any = [];
  yield appConstants.chatUserRef
    .doc(senderId)
    .collection(strings.lastMessageCollection)
    .get()
    .then(lastMessageResponse => {
      lastMessageResponse.docs.forEach(userDocument => {
        lastMessage.push({
          recentMessage: userDocument.data(),
          id: userDocument.id,
        });
      });
    });
  return lastMessage;
}

function* combineList(userList, lastMessage) {
  console.log(lastMessage, '<===last?');

  const x = userList.map((item, index: number) => {
    if (item?.uid === lastMessage?.[index]?.id) {
      return { ...item, ...lastMessage?.[index].recentMessage };
    } else {
      return item;
    }
  });
  console.log(x, ',=======>kl');
}

function* userListHandler({ payload }: ChatListSagaDataType) {
  const { user } = yield select(authDataSelectors.getData);
  // const channel: [] = yield call(appendLastMessage, payload);
  // console.log(channel, 'channel');
  // while (true) {
  //   const message: any = yield take(channel);
  //   console.log(message, 'message');
  //   console.log(payload, 'payload');
  // }
  // console.log(payload, '<=====payload');

  // const x: any = [];
  // const y = yield take(appendLastMessage, payload);
  // console.log(y);
  // appConstants.chatUserRef.onSnapshot(userSnapshot => {
  //   const fireStoreUserList: any = [];
  //   userSnapshot.forEach(async (userDocument: any) => {
  //     if (userDocument?.data()?.uid !== user?.uid) {
  //       const userData = userDocument?.data();
  //       fireStoreUserList.push(userData);
  //     }
  //   });
  //   dispatch(userListDataAction.userListRequest(fireStoreUserList));
  // });

  // const y = [];

  // const userList: AuthDataType = yield appConstants.chatUserRef
  //   .get()
  //   .then(users => {
  //     users.docs
  //       .filter(result => result?.data()?.uid !== user?.uid)
  //       .map(userData => {
  //         addLastMessage(
  //           user?.uid,
  //           userData?.data()?.uid,
  //           userData.data(),
  //         ).then(data => {
  //           // console.log(data, '???');
  //           y.push(data);
  //         });
  //         // console.log(x., 'double data');

  //         // return userData.data();
  //       });
  //   });

  // let x: any = [];
  // appConstants.chatUserRef.onSnapshot(userSnapshot => {
  //   const fireStoreUserList: any = [];
  //   userSnapshot.forEach((userDocument: any) => {
  //     if (userDocument?.data()?.uid !== user?.uid) {
  //       const userData = userDocument?.data();
  //       fireStoreUserList.push(userData);
  //     } else {
  //       addLastMessage(userDocument?.data()?.uid).then(res => console.log(res));
  //     }
  //   });
  //   // console.log(x, '<====data');

  //   // dispatch(userListDataAction.userListRequest(fireStoreUserList));
  // });
  const userList: AuthDataType = yield appConstants.chatUserRef
    .get()
    .then(users =>
      users.docs
        .filter(result => result?.data()?.uid !== user?.uid)
        .map(userData => userData.data()),
    );
  // console.log(userList, '<=====userList');
  const lastMessage = yield call(addLastMessage, user?.uid);
  const combineData = yield call(combineList, userList, lastMessage);
  // console.log(lastMessage, '<=====lkdhjfhdgjgdfg');

  yield put(userListDataAction.userListSuccess(payload));
}

export default [takeLatest(UserListType.USER_LIST_REQUEST, userListHandler)];
