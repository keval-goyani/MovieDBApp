import { put, select, takeLatest } from 'redux-saga/effects';
import { ChatSagaDataType, ChatType } from '../constants';
import chatAction, { chatDataSelector, ChatDataType } from '../redux/ChatRedux';

function* chatDataHandler({ payload }: ChatSagaDataType) {
  const { data, conversationId } = payload;
  const { chatData } = yield select(chatDataSelector.getData);

  const conversationIndex = chatData?.findIndex((conversation: ChatType) => {
    return Object.keys(conversation)?.[0] === conversationId;
  });

  const updatedData: ChatType[] =
    conversationIndex === -1
      ? [...chatData, { [conversationId]: data }]
      : chatData?.map((conversation: ChatType, index: number) => {
          if (index === conversationIndex) {
            return { [conversationId]: data };
          }

          return conversation;
        });
  yield put(chatAction.chatDataSuccess(updatedData));
}

export default [takeLatest(ChatDataType.CHAT_DATA_REQUEST, chatDataHandler)];
