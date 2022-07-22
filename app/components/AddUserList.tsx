import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { UserListEmpty } from '../components';
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
import { Icons } from '../theme';
import { styles } from './styles/AddUserListStyles';

const AddUsersList = ({ userListData }: AddUserListProps) => {
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { fetchingUserList } = useSelector(userListSelector.getData);

  const fetchingUser = useCallback(() => {
    const fireStoreUserList: UsersDocumentDataType[] = [];

    appConstants.userRef.onSnapshot(users => {
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
      });
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={navigateToChatScreen}
        activeOpacity={0.5}>
        <Image source={Icons.avatar} style={styles.avatar} />
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
