//import liraries
import React from 'react';
import {Text, View} from 'react-native';
import {strings} from '../../constants';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.homeScreen}</Text>
    </View>
  );
};

export default HomeScreen;
