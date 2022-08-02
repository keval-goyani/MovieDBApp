import firestore from '@react-native-firebase/firestore';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  appConstants,
  ChatListSagaDataType,
  ProfileUpdateDataType,
  strings,
  UserStatusDataType,
} from '../constants';
import updateProfileAction, { authDataSelectors } from '../redux/AuthRedux';
import userListDataAction, {
  chatUserListSelector,
  UserListType,
} from '../redux/ChatUserListRedux';
import { getConversationIds } from '../services/Utils';

function* userListHandler({ payload }: ChatListSagaDataType) {
  yield put(userListDataAction.userListSuccess(payload));
}

function* updateFirestore(
  conversationIds: string[],
  userId: string,
  isProfile: boolean,
  content: string,
) {
  const batch = firestore().batch();
  let totalConversation = 0;
  const updateUserData = isProfile
    ? { profileImage: content }
    : { status: content };
  const updateConversationData = isProfile
    ? {
        [`members.${userId}.profileImage`]: content,
      }
    : {
        [`members.${userId}.status`]: content,
      };

  yield appConstants.userRef.doc(userId).update(updateUserData);

  yield conversationIds.forEach((conversationId: string) => {
    appConstants.conversationRef
      .doc(conversationId)
      .get()
      .then(conversation => {
        totalConversation = totalConversation + 1;
        batch.update(conversation.ref, updateConversationData);

        if (conversationIds.length === totalConversation) {
          batch.commit();
        }
      })
      .catch(error => error);
  });
}

function* handleStausUpdate({ status }: UserStatusDataType) {
  const { user } = yield select(authDataSelectors.getData);
  const { userList } = yield select(chatUserListSelector.getData);
  const userStatus =
    status === strings.activeState
      ? strings.onlineStatus
      : strings.offlineStatus;

  const conversationIds: string[] = yield getConversationIds(
    userList,
    user?.uid,
    user?.email,
  );

  yield call(
    updateFirestore,
    conversationIds,
    user?.uid,
    appConstants.falseValue,
    userStatus,
  );
}

function* handleProfileUpdate({ profile }: ProfileUpdateDataType) {
  const { user } = yield select(authDataSelectors.getData);
  const { userList } = yield select(chatUserListSelector.getData);

  const conversationIds: string[] = yield getConversationIds(
    userList,
    user?.uid,
    user?.email,
  );

  yield call(
    updateFirestore,
    conversationIds,
    user?.uid,
    appConstants.trueValue,
    profile,
  );

  yield put(updateProfileAction.loginRequest(user?.uid));
}

export default [
  takeLatest(UserListType.USER_LIST_REQUEST, userListHandler),
  takeLatest(UserListType.USER_LIST_STATUS, handleStausUpdate),
  takeLatest(UserListType.USER_LIST_PROFILE, handleProfileUpdate),
];
