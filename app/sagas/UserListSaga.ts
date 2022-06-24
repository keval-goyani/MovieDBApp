import { put, takeLatest } from 'redux-saga/effects';
import { UserListSagaDataType } from '../constants/appTypes';
import userListAction, { UserListType } from '../redux/ChatUserListRedux';

function* requestList({ payload }: UserListSagaDataType) {
  yield put(userListAction.userListSuccess(payload));
}

export default [takeLatest(UserListType.USER_LIST_REQUEST, requestList)];
