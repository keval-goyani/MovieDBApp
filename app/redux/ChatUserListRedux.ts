import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ChatUserListType,
  RootState,
  UserListStateDataType,
} from '../constants';

const { Types, Creators } = createActions({
  userListRequest: ['payload'],
  userListSuccess: ['data'],
  userListStatus: ['status'],
  userListProfile: ['profile'],
});

export const UserListType = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<UserListStateDataType> = Immutable({
  userList: [],
  fetchingUserList: null,
});

export const chatUserListSelector = {
  getData: (state: RootState) => state?.chatUser,
};

const request = (state: ImmutableObject<UserListStateDataType>) => {
  return state.merge({
    fetchingUserList: true,
  });
};

const listData = (
  state: ImmutableObject<UserListStateDataType>,
  { data }: ChatUserListType,
) => {
  return state.merge({
    userList: data,
    fetchingUserList: false,
  });
};

export const userListReducer = createReducer(INITIAL_STATE, {
  [Types.USER_LIST_REQUEST]: request,
  [Types.USER_LIST_SUCCESS]: listData,
});
