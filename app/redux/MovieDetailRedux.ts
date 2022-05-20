import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  DetailStateDataType,
  DetailStoreDataType,
  RootState,
} from '../constants';
import { alertMessage } from '../services/Utils';

const { Types, Creators } = createActions({
  detailDataRequest: ['payload'],
  detailDataSuccess: ['data'],
  detailDataFailure: ['error'],
});

export const DetailTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<DetailStateDataType> = Immutable({
  detailData: null,
  fetchingDetailData: false,
  DetailDataFetchingError: false,
});

export const detailDataSelectors = {
  getData: (state: RootState) => state?.movieDetailData,
};

export const dataRequest = (state: ImmutableObject<DetailStateDataType>) => {
  return state.merge({
    fetchingDetailData: true,
    DetailDataFetchingError: false,
  });
};
export const detailDataSuccessHandler = (
  state: ImmutableObject<DetailStateDataType>,
  { data }: DetailStoreDataType,
) => {
  return state.merge({
    fetchingDetailData: false,
    DetailDataFetchingError: false,
    detailData: data,
  });
};

export const detailFetchingFailureHandler = (
  state: ImmutableObject<DetailStateDataType>,
  { error }: DetailStoreDataType,
) => {
  alertMessage(error);
  return state.merge({
    fetchingDetailData: false,
    DetailDataFetchingError: true,
  });
};

export const detailReducer = createReducer(INITIAL_STATE, {
  [Types.DETAIL_DATA_REQUEST]: dataRequest,
  [Types.DETAIL_DATA_SUCCESS]: detailDataSuccessHandler,
  [Types.DETAIL_DATA_FAILURE]: detailFetchingFailureHandler,
});
