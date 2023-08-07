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
  conversationId,
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
    const locationMessage = {
      conversationId,
      senderId: user?.uid ?? '',
      receiverId: receiverId ?? '',
      content: location,
      type: strings.locationType,
    };

    await chatCreation(locationMessage);
    navigation.goBack();
  };

  return (
    <>
      {!isFromChat && (
        <View style={styles.shareButton}>
          <TouchableOpacity
            testID="share-location-button"
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
