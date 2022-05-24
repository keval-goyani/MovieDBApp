import { put, takeLatest } from 'redux-saga/effects';
import { AuthSagaDataType } from '../constants';
import authAction, { AuthTypes } from '../redux/AuthRedux';

function* handleRequest({ payload }: AuthSagaDataType) {
  const { email } = payload._user;
  yield put(authAction.authSuccess(email));
}

export default [takeLatest(AuthTypes.AUTH_REQUEST, handleRequest)];
