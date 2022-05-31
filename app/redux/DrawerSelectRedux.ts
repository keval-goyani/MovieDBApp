import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  DrawerStateDataType,
  navigationStrings,
  RootState,
} from '../constants';

const { Types, Creators } = createActions({
  selected: ['payload'],
});

export const SelectedTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<DrawerStateDataType> = Immutable({
  setActiveTab: { payload: navigationStrings.Home },
});

export const selectedTabSelectors = {
  getData: (state: RootState) => state?.selectTab,
};

const selectedItem = (
  state: ImmutableObject<DrawerStateDataType>,
  payload: string,
) => {
  return state.merge({
    setActiveTab: payload,
  });
};

export const selectTabReducer = createReducer(INITIAL_STATE, {
  [Types.SELECTED]: selectedItem,
});
