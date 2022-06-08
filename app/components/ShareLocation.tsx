import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icons } from '../theme';
import { NavigationDataType, navigationStrings } from '../constants';
import { styles } from './styles/ShareLocationStyles';

const ShareLocation = () => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationStrings.Location)}>
        <Image source={Icons.location} style={styles.locationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareLocation;
