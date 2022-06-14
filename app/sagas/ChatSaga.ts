import firestore from '@react-native-firebase/firestore';
import { put, takeLatest } from 'redux-saga/effects';
import { ChatListSagaDataType, strings } from '../constants';
import chatAction, { ChatDataType } from '../redux/ChatRedux';
import { alertMessage } from '../services';

function* chatDataHandler({ payload }: { payload: string; type: string }) {
  const chatList: ChatListSagaDataType = yield firestore()
    .collection(strings.chatCollection)
    .doc(payload)
    .get()
    .then(documentSnapshot => documentSnapshot?.data())
    .catch(e => alertMessage(e));

  yield put(chatAction.chatDataSuccess(chatList?.messageList ?? []));
}

export default [takeLatest(ChatDataType.CHAT_DATA_REQUEST, chatDataHandler)];
