import { all } from 'redux-saga/effects';
import MovieDetailSaga from './MovieDetailSaga';
import MovieSaga from './MovieSaga';
export default function* rootSaga() {
  yield all([...MovieSaga, ...MovieDetailSaga]);
}
