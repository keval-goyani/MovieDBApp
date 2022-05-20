import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FreeMovieDataType,
  MovieResponseGenerator,
  MovieSagaDataType,
  PopularDataType,
  TrailerDataType,
  TrendingDataType,
} from '../constants';
import freeMovieAction, {
  freeMovieSelectors,
  FreeMovieTypes,
} from '../redux/FreeMovieRedux';
import popularAction, {
  popularDataSelectors,
  PopularTypes,
} from '../redux/PopularRedux';
import trailerAction, {
  trailerDataSelectors,
  TrailerDataTypes,
} from '../redux/TrailerRedux';
import trendingAction, {
  trendingSelectors,
  TrendingTypes,
} from '../redux/TrendingRedux';
import { getError, getPopularMovieData } from '../services';

function* popularDataRequest({
  payload: { urlMainPath, pageNo },
}: MovieSagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: PopularDataType = yield select(popularDataSelectors.getData);
  const apiData: MovieResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results },
  } = apiData;

  if (status === 200) {
    let updatedData;
    if (pageNo === 1) {
      updatedData = [...results];
    } else {
      updatedData = [...storage.whatsPopularData, ...results];
    }
    yield put(
      popularAction.whatsPopularDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: MovieResponseGenerator = yield call(getError, apiData);
    yield put(popularAction.whatsPopularDataFailure(error));
  }
}

function* freeToWatchApiDataRequest({
  payload: { urlMainPath, pageNo },
}: MovieSagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: FreeMovieDataType = yield select(freeMovieSelectors.getData);
  const apiData: MovieResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results },
  } = apiData;

  if (status === 200) {
    let updatedData;
    if (pageNo === 1) {
      updatedData = [...results];
    } else {
      updatedData = [...storage.freeToWatch, ...results];
    }
    yield put(
      freeMovieAction.freeToWatchDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: MovieResponseGenerator = yield call(getError, apiData);
    yield put(freeMovieAction.freeToWatchDataFailure(error));
  }
}

function* latestTrailerApiDataRequest({
  payload: { urlMainPath, pageNo },
}: MovieSagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: TrailerDataType = yield select(trailerDataSelectors.getData);
  const apiData: MovieResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results },
  } = apiData;

  if (status === 200) {
    let updatedData;
    if (pageNo === 1) {
      updatedData = [...results];
    } else {
      updatedData = [...storage.latestTrailers, ...results];
    }
    yield put(
      trailerAction.latestTrailerDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: MovieResponseGenerator = yield call(getError, apiData);
    yield put(trailerAction.latestTrailerDataFailure(error));
  }
}

function* trendingApiDataRequest({
  payload: { urlMainPath, pageNo },
}: MovieSagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: TrendingDataType = yield select(trendingSelectors.getData);
  const apiData: MovieResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results },
  } = apiData;

  if (status === 200) {
    let updatedData;
    if (pageNo === 1) {
      updatedData = [...results];
    } else {
      updatedData = [...storage.trending, ...results];
    }
    yield put(
      trendingAction.trendingDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: MovieResponseGenerator = yield call(getError, apiData);
    yield put(trendingAction.trendingDataFailure(error));
  }
}

export default [
  takeLatest(PopularTypes.WHATS_POPULAR_DATA_REQUEST, popularDataRequest),
  takeLatest(
    FreeMovieTypes.FREE_TO_WATCH_DATA_REQUEST,
    freeToWatchApiDataRequest,
  ),
  takeLatest(
    TrailerDataTypes.LATEST_TRAILER_DATA_REQUEST,
    latestTrailerApiDataRequest,
  ),
  takeLatest(TrendingTypes.TRENDING_DATA_REQUEST, trendingApiDataRequest),
];
