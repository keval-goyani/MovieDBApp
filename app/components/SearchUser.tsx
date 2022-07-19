import React, { useCallback, useEffect, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SearchUserProps, strings } from '../constants';
import { userListSelector } from '../redux/UserListRedux';
import { Icons } from '../theme';
import { styles } from './styles/SearchUserStyles';

const SearchUser = ({ setUsersList }: SearchUserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { userList } = useSelector(userListSelector.getData);

  const searchData = useCallback(() => {
    let filteredName = userList?.filter(userData => {
      return (
        userData.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userData.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setUsersList(filteredName);
  }, [searchQuery, setUsersList, userList]);

  useEffect(() => {
    searchData();
  }, [searchData, searchQuery]);

  const onChangeHandler = (search: string) => {
    setSearchQuery(search);
  };

  return (
    <View style={styles.searchView}>
      <TextInput
        placeholder={strings.search}
        style={styles.searchBox}
        onChangeText={search => onChangeHandler(search)}
        value={searchQuery}
        autoCapitalize="none"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => setSearchQuery('')}>
          <Image source={Icons.close} style={styles.closeButton} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchUser;
