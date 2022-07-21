import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Alert, View } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import { CustomIconRounder } from '../components';
import {
  AttachDataType,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../constants';
import {
  handleCameraPermission,
  handleDocumentPermission,
  handleGalleryPermission,
} from '../services';
import { Icons } from '../theme';
import styles from './styles/AttachStyles';

const Attach: FC<AttachDataType> = ({
  setIsAttach,
  setImagePath,
  setDocumentData,
  conversationId,
  username,
  receiverId,
}) => {
  const navigation: NavigationDataType = useNavigation();

  const turnOnLocation = (enable: boolean) => {
    if (enable) {
      navigation.navigate(navigationStrings.Location, {
        isFromChat: false,
        ...{ conversationId, username, receiverId },
      });
      setIsAttach(false);
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
      <View style={styles.iconContainer}>
        <CustomIconRounder
          backgroundColor={styles.documentBackgroundColor}
          path={Icons.fileIcon}
          iconName={strings.document}
          tintColor={styles.documentTintColor}
          onPress={() => {
            setIsAttach(false);
            handleDocumentPermission(setDocumentData);
          }}
        />
        <CustomIconRounder
          backgroundColor={styles.cameraBackgroundColor}
          path={Icons.cameraIcon}
          iconName={strings.camera}
          tintColor={styles.cameraTintColor}
          onPress={() => {
            handleCameraPermission(setImagePath);
            setIsAttach(false);
          }}
        />
        <CustomIconRounder
          backgroundColor={styles.galleryBackgroundColor}
          path={Icons.galleryIcon}
          iconName={strings.gallery}
          tintColor={styles.galleryTintColor}
          onPress={() => {
            handleGalleryPermission(setImagePath);
            setIsAttach(false);
          }}
        />
        <CustomIconRounder
          backgroundColor={styles.locationBackgroundColor}
          path={Icons.locationIcon}
          iconName={strings.map}
          tintColor={styles.locationTintColor}
          onPress={locationHandler}
        />
      </View>
    </View>
  );
};

export default Attach;
