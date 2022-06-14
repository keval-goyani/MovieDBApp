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
  } = payload;
  const userData = { email, uid, username };

  email !== '' &&
    firestore().collection(strings.chatUsers).doc(uid).set(userData);
  yield put(authAction.authSuccess(userData));
}

function* handleLoginRequest({ payload }: AuthSagaDataType) {
  const {
    user: {
      _user: { uid },
    },
  } = payload;
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
