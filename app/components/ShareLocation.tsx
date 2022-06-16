import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  ChatInputDataType,
  NavigationDataType,
  navigationStrings,
} from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/ShareLocationStyles';

const ShareLocation = ({ chatId, username }: ChatInputDataType) => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationStrings.Location, {
            isFromChat: false,
            ...{ chatId, username },
          })
        }>
        <Image source={Icons.location} style={styles.locationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareLocation;
