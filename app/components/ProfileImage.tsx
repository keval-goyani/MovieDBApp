import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileImageDataType, strings } from '../constants';
import { Icons } from '../theme';
import styles from './styles/ProfileImageStyles';

const ProfileImage = ({ profileImage, userStatus }: ProfileImageDataType) => {
  return (
    <View style={styles.profileContainer}>
      <FastImage
        source={
          profileImage
            ? {
                uri: profileImage,
                cache: FastImage.cacheControl.immutable,
              }
            : Icons.avatar
        }
        style={styles.profile}
      />
      {userStatus === strings.onlineStatus && (
        <View style={styles.userStatus} />
      )}
    </View>
  );
};

export default ProfileImage;
