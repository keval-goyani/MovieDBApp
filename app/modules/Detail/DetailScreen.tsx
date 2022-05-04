import React from 'react';
import {Text, View} from 'react-native';
import {strings} from '../../constants';
import {styles} from './styles/DetailScreenStyles';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.detailScreen}</Text>
    </View>
  );
};

export default DetailScreen;
