import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import MovieDetailSaga from './MovieDetailSaga';
import MovieSaga from './MovieSaga';

export default function* rootSaga() {
  yield all([...MovieSaga, ...MovieDetailSaga, ...AuthSaga]);
}
