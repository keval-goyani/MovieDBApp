import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ChatLocalStoreDataType,
  ChatStateDataType,
  RootState,
} from '../constants';

const { Types, Creators } = createActions({
  chatDataRequest: ['payload'],
  chatDataSuccess: ['chat'],
});

export const ChatDataType = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<ChatStateDataType> = Immutable({
  fetchingChatData: false,
  chatData: [],
});

export const chatDataSelector = {
  getData: (state: RootState) => state?.chatData,
};

const request = (state: ImmutableObject<ChatStateDataType>) => {
  return state.merge({
    fetchingChatData: true,
  });
};

const success = (
  state: ImmutableObject<ChatStateDataType>,
  { chat }: ChatLocalStoreDataType,
) => {
  return state.merge({
    fetchingChatData: false,
    chatData: chat,
  });
};

export const chatReducer = createReducer(INITIAL_STATE, {
  [Types.CHAT_DATA_REQUEST]: request,
  [Types.CHAT_DATA_SUCCESS]: success,
});
