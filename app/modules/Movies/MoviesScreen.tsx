import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../constants';
import styles from './styles/MoviesScreenStyles';

const MoviesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.movieScreen}</Text>
    </View>
  );
};

export default MoviesScreen;
