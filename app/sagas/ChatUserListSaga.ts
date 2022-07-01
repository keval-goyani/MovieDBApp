import { put, takeLatest } from 'redux-saga/effects';
import { ChatListSagaDataType } from '../constants';
import userListDataAction, { UserListType } from '../redux/ChatUserListRedux';

function* userListHandler({ payload }: ChatListSagaDataType) {
  yield put(userListDataAction.userListSuccess(payload));
}

export default [takeLatest(UserListType.USER_LIST_REQUEST, userListHandler)];
