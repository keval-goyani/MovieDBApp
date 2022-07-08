import React, { useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchModalDataType, strings } from '../constants';
import { Color } from '../theme';
import { styles } from './styles/SearchModalStyles';

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  setSearchModal,
  searchModal,
}: SearchModalDataType) => {
  const searchBox = useRef<TextInput>(null);

  useEffect(() => {
    searchModal && searchBox?.current?.focus();
  }, [searchModal]);

  return (
    <View style={styles.searchView}>
      <TextInput
        ref={searchBox}
        placeholder={strings.search}
        placeholderTextColor={Color.dimGray}
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
