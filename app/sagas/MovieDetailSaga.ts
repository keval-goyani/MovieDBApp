import { call, put, takeLatest } from 'redux-saga/effects';
import { DetailPathDataType, DetailResponseGenerator } from '../constants';
import detailAction, { DetailTypes } from '../redux/MovieDetailRedux';
import { getError, getPopularMovieData } from '../services';

function* detailDataRequest({ payload }: DetailPathDataType) {
  const response: DetailResponseGenerator = yield call(
    getPopularMovieData,
    payload,
  );
  const { status, data } = response;

  if (status === 200) {
    yield put(detailAction.detailDataSuccess(data));
  } else {
    const error: DetailResponseGenerator = yield call(getError, response);
    yield put(detailAction.detailDataFailure(error));
  }
}

export default [takeLatest(DetailTypes.DETAIL_DATA_REQUEST, detailDataRequest)];
