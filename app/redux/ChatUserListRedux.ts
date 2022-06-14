import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ChatUserListType,
  RootState,
  UserListStateDataType,
} from '../constants';

const { Types, Creators } = createActions({
  userListSuccess: ['data'],
});

export const UserListType = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<UserListStateDataType> = Immutable({
  userList: [],
  fetchingUserList: true,
});

export const chatUserListSelector = {
  getData: (state: RootState) => state?.chatUser,
};

const listData = (
  state: ImmutableObject<UserListStateDataType>,
  { data }: ChatUserListType,
) => {
  return state.replace({
    userList: data,
    fetchingUserList: false,
  });
};

export const userListReducer = createReducer(INITIAL_STATE, {
  [Types.USER_LIST_SUCCESS]: listData,
});
