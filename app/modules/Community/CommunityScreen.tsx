import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../constants';
import styles from './styles/CommunityScreenStyles';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.communityScreen}</Text>
    </View>
  );
};

export default CommunityScreen;
