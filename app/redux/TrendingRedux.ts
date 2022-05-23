import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { MovieStoreDataType, RootState, TrendingDataType } from '../constants';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  trendingDataRequest: ['payload'],
  trendingDataSuccess: ['data'],
  trendingDataFailure: ['error'],
});

export const TrendingTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<TrendingDataType> = Immutable({
  trending: [],
  trendingPage: 0,
  fetchingTrending: false,
  trendingFetchingError: false,
});

export const trendingSelectors = {
  getData: (state: RootState) => state?.trendingData,
};

export const trendingRequest = (state: ImmutableObject<TrendingDataType>) =>
  state.merge({ fetchingTrending: true, trendingFetchingError: false });

export const trendingSuccess = (
  state: ImmutableObject<TrendingDataType>,
  { data: { movieData, page } }: MovieStoreDataType,
) => {
  return state.merge({
    fetchingTrending: false,
    trendingFetchingError: false,
    trending: movieData,
    trendingPage: page,
  });
};

export const trendingDataFetchingFailure = (
  state: ImmutableObject<TrendingDataType>,
  { error }: MovieStoreDataType,
) => {
  alertMessage(error);

  return state.merge({ fetchingTrending: false, trendingFetchingError: true });
};

export const trendingReducer = createReducer(INITIAL_STATE, {
  [Types.TRENDING_DATA_REQUEST]: trendingRequest,
  [Types.TRENDING_DATA_SUCCESS]: trendingSuccess,
  [Types.TRENDING_DATA_FAILURE]: trendingDataFetchingFailure,
});
