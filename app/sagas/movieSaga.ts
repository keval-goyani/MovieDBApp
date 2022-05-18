import { call, put, select, takeLatest } from 'redux-saga/effects';
import { listItemType } from '../components/ListContainer';
import { appConstants } from '../constants';
import dataAction, {
  apiDataSelectors,
  ApiDataType,
  DataTypes,
} from '../redux/movieRedux';
import { getPopularMovieData } from '../services/Api';
import { getError } from '../services/Utils';

export interface ResponseGenerator {
  config?: object;
  data: listItemType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

interface SagaDataType {
  pageNo: number;
  type: string;
}

function* storedData() {
  const storage: ApiDataType = yield select(apiDataSelectors.getData);
  return storage;
}

function* popularDataRequest({ pageNo }: SagaDataType) {
  const apiEndPoint = `${appConstants.popularMoviePath}${appConstants.apiKey}${appConstants.page}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );

  const {
    status,
    data: { results, page },
  } = apiData;

  if (status === 200) {
    const updatedData = [...storage.whatsPopularData, ...results];
    yield put(
      dataAction.whatsPopularDataSuccess({ movieData: updatedData, page }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.whatsPopularDataFailure(error));
  }
}

function* freeToWatchApiDataRequest({ pageNo }: SagaDataType) {
  const apiEndPoint = `${appConstants.freeToWatchMoviePath}${appConstants.apiKey}${appConstants.watchFree}${appConstants.page}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results, page },
  } = apiData;

  if (status === 200) {
    const updatedData = [...storage.freeToWatch, ...results];
    yield put(
      dataAction.freeToWatchDataSuccess({ movieData: updatedData, page }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.freeToWatchDataFailure(error));
  }
}

function* latestTrailerApiDataRequest({ pageNo }: SagaDataType) {
  const apiEndPoint = `${appConstants.latestTrailerPath}${appConstants.apiKey}${appConstants.page}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results, page },
  } = apiData;

  if (status === 200) {
    const updatedData = [...storage.latestTrailers, ...results];
    yield put(
      dataAction.latestTrailerDataSuccess({ movieData: updatedData, page }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.latestTrailerDataFailure(error));
  }
}

function* trendingApiDataRequest({ pageNo }: SagaDataType) {
  const apiEndPoint = `${appConstants.trendingMoviePath}${appConstants.apiKey}${appConstants.page}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
    getPopularMovieData,
    apiEndPoint,
  );
  const {
    status,
    data: { results, page },
  } = apiData;

  if (status === 200) {
    const updatedData = [...storage.trending, ...results];
    yield put(dataAction.trendingDataSuccess({ movieData: updatedData, page }));
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.trendingDataFailure(error));
  }
}

export default [
  takeLatest(DataTypes.WHATS_POPULAR_DATA_REQUEST, popularDataRequest),
  takeLatest(DataTypes.FREE_TO_WATCH_DATA_REQUEST, freeToWatchApiDataRequest),
  takeLatest(
    DataTypes.LATEST_TRAILER_DATA_REQUEST,
    latestTrailerApiDataRequest,
  ),
  takeLatest(DataTypes.TRENDING_DATA_REQUEST, trendingApiDataRequest),
];
