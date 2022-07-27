import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Check from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { UserListEmpty } from '../components';
import {
  AddUserListProps,
  appConstants,
  NavigationDataType,
  navigationStrings,
  RenderItemTypes,
  strings,
  UsersDocumentDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import userListDataAction, { userListSelector } from '../redux/UserListRedux';
import { conversationIdCreation } from '../services';
import { Color, moderateScale } from '../theme';
import { styles } from './styles/AddUserListStyles';

const AddUsersList = ({ userListData }: AddUserListProps) => {
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { fetchingUserList } = useSelector(userListSelector.getData);
  const [selectedItems, setSelectedItems] = useState([]);

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

    const handleOnPress = param => {
      if (selectedItems.length) {
        return selectNotes(param);
      }
      navigation.goBack();
      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        username: item?.username,
        receiverId: item?.uid,
        userStatus: item?.status,
        profileImage: item?.profileImage,
      });
    };
    const getSelected = param => selectedItems.includes(param.email);
    const selected = getSelected(item);

    const selectNotes = param => {
      if (selectedItems.includes(param)) {
        const newListItem = selectedItems.filter(email => email !== param);
        return setSelectedItems(newListItem);
      }
      setSelectedItems([...selectedItems, param]);
    };
    console.log(selectedItems, '<======selectedItems');

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleOnPress(item.email)}
        activeOpacity={0.8}
        onLongPress={() => selectNotes(item.email)}>
        <View style={styles.itemContainer}>
          {/* <Image source={Icons.avatar} style={styles.avatar} /> */}
          <FastImage
            source={{
              uri: item?.profileImage,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.profile}
          />
          {item?.status === strings.onlineStatus ? (
            <View style={styles.userStatus} />
          ) : (
            <View />
          )}
          <View style={styles.nameView}>
            <Text style={styles.text}>{item?.username}</Text>
            <Text
              style={styles.lastChatText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item?.email}
            </Text>
          </View>
        </View>
        {selected && (
          <>
            <View style={styles.overlay} />
            <Check
              name={'checkcircle'}
              size={moderateScale(23)}
              color={Color.lightBlue}
              style={styles.iconStyle}
            />
          </>
        )}
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
