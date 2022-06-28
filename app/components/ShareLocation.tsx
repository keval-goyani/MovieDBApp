import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import {
  ChatInputDataType,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/ShareLocationStyles';

const ShareLocation = ({ chatId, username }: ChatInputDataType) => {
  const navigation: NavigationDataType = useNavigation();

  const turnOnLocation = (enable: boolean) => {
    if (enable) {
      navigation.navigate(navigationStrings.Location, {
        isFromChat: false,
        ...{ chatId, username },
      });
    } else {
      Alert.alert(strings.turnOn, strings.goToSetting, [
        {
          onPress: () => SystemSetting.switchLocation(),
          text: strings.setting,
        },
        { text: strings.cancel },
      ]);
    }
  };

  const locationHandler = () => {
    SystemSetting.isLocationEnabled()
      .then(enable => {
        turnOnLocation(enable);
      })
      .catch(error => Alert.alert(strings.warning, error));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={locationHandler}>
        <Image source={Icons.location} style={styles.locationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareLocation;
