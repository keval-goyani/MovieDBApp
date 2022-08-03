import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  RootState,
  UsersListStateDataType,
  ChatUsersListType,
} from '../constants';

const { Types, Creators } = createActions({
  usersListSuccess: ['data'],
});

export const UsersListType = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<UsersListStateDataType> = Immutable(
  {
    userList: [],
    fetchingUserList: true,
  },
);

export const userListSelector = {
  getData: (state: RootState) => state?.user,
};

const listData = (
  state: ImmutableObject<UsersListStateDataType>,
  { data }: ChatUsersListType,
) => {
  return state.merge({
    userList: data,
    fetchingUserList: false,
  });
};

export const usersListReducer = createReducer(INITIAL_STATE, {
  [Types.USERS_LIST_SUCCESS]: listData,
});
