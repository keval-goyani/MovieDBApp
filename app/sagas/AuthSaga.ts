import firestore from '@react-native-firebase/firestore';
import { put, takeLatest } from 'redux-saga/effects';
import {
  AuthSagaDataType,
  FireStoreResponseDataType,
  strings,
} from '../constants';
import authAction, { AuthTypes } from '../redux/AuthRedux';

function* handleSignUpRequest({ payload }: AuthSagaDataType) {
  const {
    user: {
      _user: { email, uid },
    },
    username,
    token,
  } = payload;
  const userData = { email, uid, username, token };

  email !== '' &&
    firestore().collection(strings.chatUsers).doc(uid).set(userData);
  yield put(authAction.authSuccess(userData));
}

function* handleLoginRequest({ payload }: AuthSagaDataType) {
  const {
    user: {
      _user: { uid },
    },
    token,
  } = payload;
  yield firestore().collection(strings.chatUsers).doc(uid).update({ token });
  // .then(res => console.log(res, '<====Response'));

  const fireStoreResponse: FireStoreResponseDataType = yield firestore()
    .collection(strings.chatUsers)
    .doc(uid)
    .get();
  const { _data } = fireStoreResponse;

  yield put(authAction.authSuccess(_data));
}

export default [
  takeLatest(AuthTypes.AUTH_REQUEST, handleSignUpRequest),
  takeLatest(AuthTypes.LOGIN_REQUEST, handleLoginRequest),
];
