import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { put, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  AuthSagaDataType,
  LoginSagaDataType,
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
  const userData = {
    email,
    uid,
    username,
    profileImage: strings.emptyString,
    status: strings.onlineStatus,
  };

  email !== '' && appConstants.userRef.doc(uid).set(userData);
  yield put(authAction.authSuccess(userData));
}

function* handleLoginRequest({ payload }: LoginSagaDataType) {
  const fireStoreResponse: FirebaseFirestoreTypes.DocumentData =
    yield appConstants.userRef.doc(payload).get();

  yield put(authAction.authSuccess(fireStoreResponse?.data()));
}

export default [
  takeLatest(AuthTypes.SIGN_UP_REQUEST, handleSignUpRequest),
  takeLatest(AuthTypes.LOGIN_REQUEST, handleLoginRequest),
];
