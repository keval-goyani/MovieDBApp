import firestore from '@react-native-firebase/firestore';
import { put, takeLatest } from 'redux-saga/effects';
import { LatestMessageDataType, strings } from '../constants';
import chatAction, { ChatDataType } from '../redux/ChatRedux';
import { alertMessage } from '../services';

function* chatDataHandler({ payload }: { payload: string; type: string }) {
  const firestoreChatList: LatestMessageDataType[] = [];

  yield firestore()
    .collection(strings.chatCollection)
    .doc(payload)
    .collection(strings.messageCollection)
    .orderBy('createdAt', 'asc')
    .get()
    .then(documentSnapshot => {
      documentSnapshot.forEach(document => {
        firestoreChatList.push(document?.data());
      });
    })
    .catch(error => alertMessage(error));
  yield put(chatAction.chatDataSuccess(firestoreChatList));
}

export default [takeLatest(ChatDataType.CHAT_DATA_REQUEST, chatDataHandler)];
