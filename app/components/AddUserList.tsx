import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { ProfileImage, UserListEmpty } from '../components';
import {
  AddUserListProps,
  appConstants,
  NavigationDataType,
  navigationStrings,
  RenderItemTypes,
  UsersDocumentDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import userListDataAction, { userListSelector } from '../redux/UserListRedux';
import { conversationIdCreation } from '../services';
import { styles } from './styles/AddUserListStyles';

const AddUsersList = ({ userListData }: AddUserListProps) => {
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { fetchingUserList } = useSelector(userListSelector.getData);

  const fetchingUser = useCallback(() => {
    appConstants.userRef.onSnapshot(users => {
      const fireStoreUserList: UsersDocumentDataType[] = [];

      users.forEach(userData => {
        if (userData?.data()?.uid !== user?.uid) {
          fireStoreUserList.push(userData?.data());
        }

        dispatch(userListDataAction.usersListSuccess(fireStoreUserList));
      });
    });
  }, [dispatch, user]);

  useFocusEffect(
    useCallback(() => {
      const sub = fetchingUser();
      return () => sub;
    }, [fetchingUser]),
  );

  const renderUserList = ({ item }: RenderItemTypes) => {
    const conversationId: string = conversationIdCreation(
      user?.email ?? '',
      item?.email,
    );

    const navigateToChatScreen = () => {
      navigation.goBack();
      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        username: item?.username,
        receiverId: item?.uid,
        userStatus: item?.status,
        profileImage: item?.profileImage,
      });
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={navigateToChatScreen}
        activeOpacity={0.5}>
        <ProfileImage
          profileImage={item?.profileImage}
          userStatus={item?.status}
        />
        <View style={styles.nameView}>
          <Text style={styles.text}>{item?.username}</Text>
          <Text
            style={styles.lastChatText}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item?.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={asMutable(userListData) ?? []}
      renderItem={renderUserList}
      ListEmptyComponent={
        <UserListEmpty
          fetching={fetchingUserList}
          userListLength={userListData.length}
        />
      }
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default AddUsersList;
