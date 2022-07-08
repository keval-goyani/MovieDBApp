import React from 'react';
import { Image, Text, View } from 'react-native';
import { Icons } from '../assets';
import { Loader } from '../components';
import { strings, UserListEmptyType } from '../constants';
import styles from './styles/UserListEmptyStyles';

const UserListEmpty = ({ fetching, userListLength }: UserListEmptyType) => {
  return fetching === false && userListLength === 0 ? (
    <View style={styles.emptyUserListContainer}>
      <Image source={Icons.noItemFound} style={styles.noItemFoundImage} />
      <View style={styles.description}>
        <Text style={styles.noItemFoundText}>{strings.noItemFound}</Text>
        <Text style={styles.makeSureText}>{strings.makeSure}</Text>
      </View>
    </View>
  ) : (
    <Loader size="small" />
  );
};

export default UserListEmpty;
