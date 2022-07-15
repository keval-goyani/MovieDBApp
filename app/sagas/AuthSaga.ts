import { put, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  AuthSagaDataType,
  FireStoreResponseDataType,
} from '../constants';
import authAction, { AuthTypes } from '../redux/AuthRedux';

function* handleSignUpRequest({ payload }: AuthSagaDataType) {
  const {
    user: {
      _user: { email, uid },
    },
    username,
  } = payload;
  const userData = { email, uid, username, profileImage: '' };

  email !== '' && appConstants.userRef.doc(uid).set(userData);

  yield put(authAction.authSuccess(userData));
}

function* handleLoginRequest({ payload }: AuthSagaDataType) {
  const {
    user: {
      _user: { uid },
    },
  } = payload;
  const fireStoreResponse: FireStoreResponseDataType =
    yield appConstants.userRef.doc(uid).get();
  const { _data } = fireStoreResponse;

  yield put(authAction.authSuccess(_data));
}

export default [
  takeLatest(AuthTypes.AUTH_REQUEST, handleSignUpRequest),
  takeLatest(AuthTypes.LOGIN_REQUEST, handleLoginRequest),
];
