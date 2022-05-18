import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { listItemDataType } from '../components/ListContainer';
import rootReducer from '.';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  whatsPopularDataRequest: ['pageNo'],
  whatsPopularDataSuccess: ['data'],
  whatsPopularDataFailure: ['error'],
  freeToWatchDataRequest: ['pageNo'],
  freeToWatchDataSuccess: ['data'],
  freeToWatchDataFailure: ['error'],
  latestTrailerDataRequest: ['pageNo'],
  latestTrailerDataSuccess: ['data'],
  latestTrailerDataFailure: ['error'],
  trendingDataRequest: ['pageNo'],
  trendingDataSuccess: ['data'],
  trendingDataFailure: ['error'],
});

export const DataTypes = Types;
export default Creators;

export interface ApiDataType {
  whatsPopularData: Array<listItemDataType>;
  freeToWatch: Array<listItemDataType>;
  latestTrailers: Array<listItemDataType>;
  trending: Array<listItemDataType>;
  whatsPopularPage: number;
  freeToWatchPage: number;
  latestTrailersPage: number;
  trendingPage: number;
  fetchingWhatsPopularData: boolean;
  fetchingFreeToWatch: boolean;
  fetchingLatestTrailers: boolean;
  fetchingTrending: boolean;
  whatsPopularDataFetchingError: boolean;
  freeToWatchFetchingError: boolean;
  latestTrailersFetchingError: boolean;
  trendingFetchingError: boolean;
}

export const INITIAL_STATE: ImmutableObject<ApiDataType> = Immutable({
  whatsPopularData: [],
  freeToWatch: [],
  latestTrailers: [],
  trending: [],
  whatsPopularPage: 1,
  freeToWatchPage: 1,
  latestTrailersPage: 1,
  trendingPage: 1,
  fetchingWhatsPopularData: false,
  fetchingFreeToWatch: false,
  fetchingLatestTrailers: false,
  fetchingTrending: false,
  whatsPopularDataFetchingError: false,
  freeToWatchFetchingError: false,
  latestTrailersFetchingError: false,
  trendingFetchingError: false,
});

export interface StoreDataType {
  data: {
    movieData: object;
    page: number;
  };
  error: string;
}

export type RootState = ReturnType<typeof rootReducer>;

export const apiDataSelectors = {
  getData: (state: RootState) => state?.movieData,
};

export const popularDataRequest = (state: ImmutableObject<ApiDataType>) => {
  return state.merge({
    fetchingWhatsPopularData: state.whatsPopularPage === 1 ? true : false,
    whatsPopularDataFetchingError: false,
  });
};
export const popularDataSuccess = (
  state: ImmutableObject<ApiDataType>,
  { data: { movieData, page } }: StoreDataType,
) => {
  return state.merge({
    fetchingWhatsPopularData: false,
    whatsPopularDataFetchingError: false,
    whatsPopularData: movieData,
    whatsPopularPage: page,
  });
};

export const popularDataFetchingFailure = (
  state: ImmutableObject<ApiDataType>,
  { error }: StoreDataType,
) => {
  alertMessage(error);
  return state.merge({
    fetchingWhatsPopularData: false,
    whatsPopularDataFetchingError: true,
  });
};

export const freeWatchDataRequest = (state: ImmutableObject<ApiDataType>) =>
  state.merge({ fetchingFreeToWatch: true, freeToWatchFetchingError: false });

export const freeWatchDataSuccess = (
  state: ImmutableObject<ApiDataType>,
  { data: { movieData, page } }: StoreDataType,
) => {
  return state.merge({
    fetchingFreeToWatch: false,
    freeToWatchFetchingError: false,
    freeToWatch: movieData,
    freeToWatchPage: page,
  });
};

export const freeWatchDataFetchingFailure = (
  state: ImmutableObject<ApiDataType>,
  { error }: StoreDataType,
) => {
  alertMessage(error);
  return state.merge({
    fetchingFreeToWatch: false,
    freeToWatchFetchingError: true,
  });
};

export const trailerDataRequest = (state: ImmutableObject<ApiDataType>) =>
  state.merge({
    fetchingLatestTrailers: true,
    latestTrailersFetchingError: false,
  });

export const trailerDataSuccess = (
  state: ImmutableObject<ApiDataType>,
  { data: { movieData, page } }: StoreDataType,
) => {
  return state.merge({
    fetchingLatestTrailers: false,
    latestTrailersFetchingError: false,
    latestTrailers: movieData,
    latestTrailersPage: page,
  });
};

export const trailerDataFetchingFailure = (
  state: ImmutableObject<ApiDataType>,
  { error }: StoreDataType,
) => {
  alertMessage(error);

  return state.merge({
    fetchingLatestTrailers: false,
    latestTrailersFetchingError: true,
  });
};

export const trendingRequest = (state: ImmutableObject<ApiDataType>) =>
  state.merge({ fetchingTrending: true, trendingFetchingError: false });

export const trendingSuccess = (
  state: ImmutableObject<ApiDataType>,
  { data: { movieData, page } }: StoreDataType,
) => {
  return state.merge({
    fetchingTrending: false,
    trendingFetchingError: false,
    trending: movieData,
    trendingPage: page,
  });
};

export const trendingDataFetchingFailure = (
  state: ImmutableObject<ApiDataType>,
  { error }: StoreDataType,
) => {
  alertMessage(error);

  return state.merge({ fetchingTrending: false, trendingFetchingError: true });
};

export const movieReducer = createReducer(INITIAL_STATE, {
  [Types.WHATS_POPULAR_DATA_REQUEST]: popularDataRequest,
  [Types.WHATS_POPULAR_DATA_SUCCESS]: popularDataSuccess,
  [Types.WHATS_POPULAR_DATA_FAILURE]: popularDataFetchingFailure,
  [Types.FREE_TO_WATCH_DATA_REQUEST]: freeWatchDataRequest,
  [Types.FREE_TO_WATCH_DATA_SUCCESS]: freeWatchDataSuccess,
  [Types.FREE_TO_WATCH_DATA_FAILURE]: freeWatchDataFetchingFailure,
  [Types.LATEST_TRAILER_DATA_REQUEST]: trailerDataRequest,
  [Types.LATEST_TRAILER_DATA_SUCCESS]: trailerDataSuccess,
  [Types.LATEST_TRAILER_DATA_FAILURE]: trailerDataFetchingFailure,
  [Types.TRENDING_DATA_REQUEST]: trendingRequest,
  [Types.TRENDING_DATA_SUCCESS]: trendingSuccess,
  [Types.TRENDING_DATA_FAILURE]: trendingDataFetchingFailure,
});
