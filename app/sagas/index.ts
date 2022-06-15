import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import ChatSaga from './ChatSaga';
import MovieDetailSaga from './MovieDetailSaga';
import MovieSaga from './MovieSaga';

export default function* rootSaga() {
  yield all([...AuthSaga, ...ChatSaga, ...MovieDetailSaga, ...MovieSaga]);
}
