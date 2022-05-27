import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchModalDataType, strings } from '../constants';
import { styles } from './styles/SearchModalStyles';

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  setSearchModal,
  searchModal,
}: SearchModalDataType) => {
  return (
    <View style={styles.searchView}>
      <TextInput
        placeholder={strings.search}
        style={styles.searchBox}
        onChangeText={search => setSearchQuery(search)}
        value={searchQuery}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setSearchModal(!searchModal)}>
        <Text style={styles.cancel}>{strings.cancel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchModal;
