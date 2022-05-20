import { all } from 'redux-saga/effects';
import MovieDetailSaga from './MovieDetailSaga';
import movieSaga from './movieSaga';
export default function* rootSaga() {
  yield all([...movieSaga, ...MovieDetailSaga]);
}
