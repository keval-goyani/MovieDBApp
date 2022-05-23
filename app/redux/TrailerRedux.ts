import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { MovieStoreDataType, RootState, TrailerDataType } from '../constants';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  latestTrailerDataRequest: ['payload'],
  latestTrailerDataSuccess: ['data'],
  latestTrailerDataFailure: ['error'],
});

export const TrailerDataTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<TrailerDataType> = Immutable({
  latestTrailers: [],
  latestTrailersPage: 0,
  fetchingLatestTrailers: false,
  latestTrailersFetchingError: false,
});

export const trailerDataSelectors = {
  getData: (state: RootState) => state?.trailerData,
};

export const trailerDataRequest = (state: ImmutableObject<TrailerDataType>) =>
  state.merge({
    fetchingLatestTrailers: true,
    latestTrailersFetchingError: false,
  });

export const trailerDataSuccess = (
  state: ImmutableObject<TrailerDataType>,
  { data: { movieData, page } }: MovieStoreDataType,
) => {
  return state.merge({
    fetchingLatestTrailers: false,
    latestTrailersFetchingError: false,
    latestTrailers: movieData,
    latestTrailersPage: page,
  });
};

export const trailerDataFetchingFailure = (
  state: ImmutableObject<TrailerDataType>,
  { error }: MovieStoreDataType,
) => {
  alertMessage(error);

  return state.merge({
    fetchingLatestTrailers: false,
    latestTrailersFetchingError: true,
  });
};

export const trailerReducer = createReducer(INITIAL_STATE, {
  [Types.LATEST_TRAILER_DATA_REQUEST]: trailerDataRequest,
  [Types.LATEST_TRAILER_DATA_SUCCESS]: trailerDataSuccess,
  [Types.LATEST_TRAILER_DATA_FAILURE]: trailerDataFetchingFailure,
});
