import firestore from '@react-native-firebase/firestore';
import { put, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  AuthDataType,
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

  const userList: AuthDataType = yield appConstants.chatUserRef
    .get()
    .then(users =>
      users.docs.map(user => user.data()).filter(result => result?.uid !== uid),
    );

  // userData =

  console.log(userList, '<=====userList');
  yield put(authAction.authSuccess(_data));
}

export default [
  takeLatest(AuthTypes.AUTH_REQUEST, handleSignUpRequest),
  takeLatest(AuthTypes.LOGIN_REQUEST, handleLoginRequest),
];
