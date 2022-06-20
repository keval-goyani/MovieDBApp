import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  CustomButtonProps,
  NavigationDataType,
  navigationStrings,
  ShareLocationDataProps,
  strings,
} from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/CustomShareLocationButtonStyles';

const CustomShareLocationButton = ({
  isFromChat,
  chatId,
  username,
  latitude,
  longitude,
}: CustomButtonProps) => {
  const navigation: NavigationDataType = useNavigation();

  const shareLocationHandler = ({
    currentLatitude,
    currentLongitude,
  }: ShareLocationDataProps) => {
    navigation.navigate(navigationStrings.Chat, {
      ...{ chatId, username, currentLatitude, currentLongitude },
    });
  };

  return (
    <>
      {!isFromChat && (
        <View style={styles.shareButton}>
          <TouchableOpacity
            style={styles.locationShareButton}
            onPress={() =>
              shareLocationHandler({
                currentLatitude: latitude,
                currentLongitude: longitude,
              })
            }>
            <View style={styles.imageContainer}>
              <Image source={Icons.location} style={styles.locationIcon} />
            </View>
            <Text style={styles.text}>{strings.shareLiveLocation}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomShareLocationButton;
