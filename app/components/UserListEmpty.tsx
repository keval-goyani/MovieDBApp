import React from 'react';
import { Text, View } from 'react-native';
import { Loader } from '../components';
import { strings } from '../constants';
import styles from './styles/UserListEmptyStyles';

const UserListEmpty = ({ fetching }: { fetching: boolean }) => {
  return fetching ? (
    <Loader size="small" animating={fetching} />
  ) : (
    <View style={styles.emptyUserListContainer}>
      <Text style={styles.userNotFoundText}>{strings.noUserFound}</Text>
    </View>
  );
};

export default UserListEmpty;
