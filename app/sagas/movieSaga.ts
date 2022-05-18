import { call, put, select, takeLatest } from 'redux-saga/effects';
import { listItemType } from '../components/ListContainer';
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
  path: {
    urlMainPath?: string;
    pageNo: number;
  };
  type: string;
}

function* storedData() {
  const storage: ApiDataType = yield select(apiDataSelectors.getData);
  return storage;
}

function* popularDataRequest({ path: { urlMainPath, pageNo } }: SagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
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
      dataAction.whatsPopularDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.whatsPopularDataFailure(error));
  }
}

function* freeToWatchApiDataRequest({
  path: { urlMainPath, pageNo },
}: SagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
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
      dataAction.freeToWatchDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.freeToWatchDataFailure(error));
  }
}

function* latestTrailerApiDataRequest({
  path: { urlMainPath, pageNo },
}: SagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
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
      dataAction.latestTrailerDataSuccess({
        movieData: updatedData,
        page: pageNo,
      }),
    );
  } else {
    const error: ResponseGenerator = yield call(getError, apiData);
    yield put(dataAction.latestTrailerDataFailure(error));
  }
}

function* trendingApiDataRequest({
  path: { urlMainPath, pageNo },
}: SagaDataType) {
  const apiEndPoint = `${urlMainPath}${pageNo}`;
  const storage: ApiDataType = yield call(storedData);
  const apiData: ResponseGenerator = yield call(
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
      dataAction.trendingDataSuccess({ movieData: updatedData, page: pageNo }),
    );
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
