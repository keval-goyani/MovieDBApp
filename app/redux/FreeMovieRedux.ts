import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { FreeMovieDataType, MovieStoreDataType, RootState } from '../constants';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  freeToWatchDataRequest: ['payload'],
  freeToWatchSearchData: ['searchData'],
  freeToWatchDataSuccess: ['data'],
  freeToWatchDataFailure: ['error'],
});

export const FreeMovieTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<FreeMovieDataType> = Immutable({
  freeToWatch: [],
  freeToWatchSearch: [],
  freeToWatchPage: 0,
  fetchingFreeToWatch: false,
  freeToWatchFetchingError: false,
});

export const freeMovieSelectors = {
  getData: (state: RootState) => state?.freeMovieData,
};

export const freeWatchDataRequest = (
  state: ImmutableObject<FreeMovieDataType>,
) =>
  state.merge({ fetchingFreeToWatch: true, freeToWatchFetchingError: false });

export const freeWatchDataSuccess = (
  state: ImmutableObject<FreeMovieDataType>,
  { data: { movieData, page } }: MovieStoreDataType,
) => {
  return state.merge({
    fetchingFreeToWatch: false,
    freeToWatchFetchingError: false,
    freeToWatch: movieData,
    freeToWatchPage: page,
  });
};

export const freeWatchDataFetchingFailure = (
  state: ImmutableObject<FreeMovieDataType>,
  { error }: MovieStoreDataType,
) => {
  alertMessage(error);
  return state.merge({
    fetchingFreeToWatch: false,
    freeToWatchFetchingError: true,
  });
};

export const freeToWatchSearchData = (
  state: ImmutableObject<FreeMovieDataType>,
  { searchData }: MovieStoreDataType,
) => {
  return state.merge({ freeToWatchSearch: searchData });
};

export const freeMovieReducer = createReducer(INITIAL_STATE, {
  [Types.FREE_TO_WATCH_DATA_REQUEST]: freeWatchDataRequest,
  [Types.FREE_TO_WATCH_SEARCH_DATA]: freeToWatchSearchData,
  [Types.FREE_TO_WATCH_DATA_SUCCESS]: freeWatchDataSuccess,
  [Types.FREE_TO_WATCH_DATA_FAILURE]: freeWatchDataFetchingFailure,
});
