import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../constants';
import styles from './styles/TrailerScreenStyles';

const TrailersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.trailersScreen}</Text>
    </View>
  );
};

export default TrailersScreen;
