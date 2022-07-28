import { put, select, takeLatest } from 'redux-saga/effects';
import { appConstants, ChatSagaDataType } from '../constants';
import chatAction, { chatDataSelector, ChatDataType } from '../redux/ChatRedux';
import { Metrics } from '../theme';

function* chatDataHandler({ payload }: ChatSagaDataType) {
  const { data, conversationId } = payload;
  const { chatData } = yield select(chatDataSelector.getData);
  const previousChat = chatData?.[conversationId];
  const clearChatLength =
    previousChat?.clearChatLength + previousChat?.data?.length;
  let updatedData;

  if (data) {
    updatedData = chatData.hasOwnProperty(conversationId)
      ? {
          ...chatData,
          [conversationId]: { ...chatData[conversationId], data },
        }
      : {
          ...chatData,
          [conversationId]: { data, clearChatLength: Metrics.zero },
        };
  } else {
    updatedData = {
      ...chatData,
      [conversationId]: {
        data: appConstants.emptyArray,
        clearChatLength,
      },
    };
  }

  yield put(chatAction.chatDataSuccess(updatedData));
}

export default [takeLatest(ChatDataType.CHAT_DATA_REQUEST, chatDataHandler)];
