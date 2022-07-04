import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomButtonProps,
  NavigationDataType,
  ShareLocationDataProps,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { chatCreation } from '../services';
import { Icons } from '../theme';
import { styles } from './styles/CustomShareLocationButtonStyles';

const CustomShareLocationButton = ({
  isFromChat,
  chatId,
  latitude,
  longitude,
  receiverId,
}: CustomButtonProps) => {
  const navigation: NavigationDataType = useNavigation();
  const { user } = useSelector(authDataSelectors.getData);

  const shareLocationHandler = async ({
    currentLatitude,
    currentLongitude,
  }: ShareLocationDataProps) => {
    const location = `${currentLatitude},${currentLongitude}`;
    const emptyDocument = { documentUrl: '', documentName: '' };

    await chatCreation(
      chatId,
      user?.uid ?? '',
      receiverId ?? '',
      location,
      strings.locationType,
      emptyDocument,
    );
    navigation.goBack();
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
