import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { MovieStoreDataType, PopularDataType, RootState } from '../constants';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  whatsPopularDataRequest: ['payload'],
  searchRequest: ['query'],
  moviesPaginationRequest: [''],
  whatsPopularSearchData: ['searchData'],
  whatsPopularDataSuccess: ['data'],
  whatsPopularDataFailure: ['error'],
});

export const PopularTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<PopularDataType> = Immutable({
  whatsPopularData: [],
  whatsPopularSearch: [],
  whatsPopularPage: 0,
  fetchingWhatsPopularData: false,
  whatsPopularDataFetchingError: false,
});

export const popularDataSelectors = {
  getData: (state: RootState) => state?.popularData,
};

export const popularDataRequest = (state: ImmutableObject<PopularDataType>) => {
  return state.merge({
    fetchingWhatsPopularData: true,
    whatsPopularDataFetchingError: false,
  });
};
export const popularDataSuccess = (
  state: ImmutableObject<PopularDataType>,
  { data: { movieData, page } }: MovieStoreDataType,
) => {
  return state.merge({
    fetchingWhatsPopularData: false,
    whatsPopularDataFetchingError: false,
    whatsPopularData: movieData,
    whatsPopularPage: page,
  });
};

export const popularDataFetchingFailure = (
  state: ImmutableObject<PopularDataType>,
  { error }: MovieStoreDataType,
) => {
  alertMessage(error);
  return state.merge({
    fetchingWhatsPopularData: false,
    whatsPopularDataFetchingError: true,
  });
};

export const popularSearchData = (
  state: ImmutableObject<PopularDataType>,
  { searchData }: MovieStoreDataType,
) => {
  return state.merge({ whatsPopularSearch: searchData });
};

export const popularReducer = createReducer(INITIAL_STATE, {
  [Types.WHATS_POPULAR_DATA_REQUEST]: popularDataRequest,
  [Types.WHATS_POPULAR_DATA_SUCCESS]: popularDataSuccess,
  [Types.WHATS_POPULAR_SEARCH_DATA]: popularSearchData,
  [Types.WHATS_POPULAR_DATA_FAILURE]: popularDataFetchingFailure,
});
