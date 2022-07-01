import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import ChatSaga from './ChatSaga';
import ChatUserListSaga from './ChatUserListSaga';
import MovieDetailSaga from './MovieDetailSaga';
import MovieSaga from './MovieSaga';

export default function* rootSaga() {
  yield all([
    ...AuthSaga,
    ...ChatSaga,
    ...ChatUserListSaga,
    ...MovieDetailSaga,
    ...MovieSaga,
  ]);
}
