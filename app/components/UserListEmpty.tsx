import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../constants';
import { Color } from '../theme';
import Loader from './Loader';
import styles from './styles/UserListEmptyStyles';

interface UserListEmptyDataType {
  fetchingUserList: boolean;
  length: number;
}

const UserListEmpty = ({ fetchingUserList, length }: UserListEmptyDataType) => {
  if (fetchingUserList === true || length === 0) {
    return <Loader animating={true} color={Color.darkBlue} />;
  }

  return (
    <View style={styles.emptyUserListContainer}>
      <Text style={styles.userNotFoundText}>{strings.noUserFound}</Text>
    </View>
  );
};

export default UserListEmpty;
