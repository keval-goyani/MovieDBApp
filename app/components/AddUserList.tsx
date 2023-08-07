import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Check from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { ProfileImage, UserListEmpty } from '../components';
import {
  AddUserListProps,
  NavigationDataType,
  navigationStrings,
  RenderItemTypes,
  SelectedUsersProps,
  strings,
  UserDataType,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { userListSelector } from '../redux/UserListRedux';
import { conversationIdCreation, sub } from '../services';
import { Color, moderateScale } from '../theme';
import { styles } from './styles/AddUserListStyles';

const AddUsersList = ({ userListData, setSelectedUsers }: AddUserListProps) => {
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);
  const { fetchingUserList } = useSelector(userListSelector.getData);
  const [selectedItems, setSelectedItems] = useState<UserDataType[]>([]);

  useFocusEffect(() => {
    sub({ user, dispatch });
    return () => sub;
  });

  useEffect(() => {
    setSelectedUsers(selectedItems);
  }, [selectedItems, setSelectedUsers]);

  const renderUserList = ({ item, index }: RenderItemTypes) => {
    const usersEmail = [user?.email ?? '', item?.email];
    const conversationId: string = conversationIdCreation(usersEmail);

    const handleOnPress = (selectedUser: UserDataType) => {
      console.log(selectedItems, '<==selectedItems.length');
      console.log(selectedUser, '<==selectedUser');

      if (selectedItems.length) {
        return selectUsers(selectedUser);
      }
      navigation.goBack();
      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        username: item?.username,
        receiverId: item?.uid,
        userStatus: item?.status,
        profileImage: item?.profileImage,
        userEmail: item?.email,
      });
    };

    const getSelected = (usersData: SelectedUsersProps) => {
      return JSON.stringify(selectedItems).includes(JSON.stringify(usersData));
    };

    const selected = getSelected(item);

    const selectUsers = (selectedUser: UserDataType) => {
      if (
        JSON.stringify(selectedItems).includes(JSON.stringify(selectedUser))
      ) {
        const filteredList = selectedItems?.filter(
          (items: UserDataType) => items !== selectedUser,
        );
        setSelectedItems(filteredList);
      } else {
        setSelectedItems([...selectedItems, selectedUser]);
      }
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleOnPress(item)}x
        activeOpacity={0.8}
        onLongPress={() => selectUsers(item)}
        testID={`button-for-test${index}`}>
        <View style={styles.itemContainer}>
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
        </View>
        {selected && (
          <>
            <View style={styles.overlay} />
            <Check
              testID="check"
              name={strings.checkIcon}
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
      testID={'flatList'}
      data={asMutable(userListData)}
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
