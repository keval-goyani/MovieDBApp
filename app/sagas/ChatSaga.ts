import { put, select, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  ChatSagaDataType,
  FilterDataOfClearChatProps,
  strings,
} from '../constants';
import chatAction, { chatDataSelector, ChatDataType } from '../redux/ChatRedux';
import userListDataAction, {
  chatUserListSelector,
} from '../redux/ChatUserListRedux';
import { Metrics } from '../theme';

function* chatDataHandler({ payload }: ChatSagaDataType) {
  const { data, conversationId } = payload;
  const { chatData } = yield select(chatDataSelector.getData);
  const { userList } = yield select(chatUserListSelector.getData);

  const filterDataOfClearChat = userList?.map(
    (filteredList: FilterDataOfClearChatProps) => {
      if (Object.values(filteredList)?.[6] === conversationId) {
        return {
          ...{
            ...filteredList,
            ...{
              updatedAt: 0,
              latestMessage: {
                ...filteredList?.latestMessage,
                content: strings.emptyString,
              },
            },
          },
        };
      }

      return filteredList;
    },
  );

  const previousChat = chatData?.[conversationId];
  const clearChatLength =
    previousChat?.clearChatLength + previousChat?.data?.length;
  let updatedData;
  let newUserListData;
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
    newUserListData = filterDataOfClearChat;

    yield put(userListDataAction.userListSuccess(newUserListData));
  }

  yield put(chatAction.chatDataSuccess(updatedData));
}

export default [takeLatest(ChatDataType.CHAT_DATA_REQUEST, chatDataHandler)];
