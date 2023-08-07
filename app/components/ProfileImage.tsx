import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { appConstants, ProfileImageDataType, strings } from '../constants';
import { Icons } from '../theme';
import { profileStyles } from './styles/ProfileImageStyles';

const ProfileImage = ({
  profileImage,
  userStatus,
  groupName,
  customStyle,
  customImageStyles,
  defaultUserImageStyle,
  isChatHeader = appConstants.falseValue,
}: ProfileImageDataType) => {
  console.log(profileImage, '<==profileImage');

  const defaultImage = groupName ? Icons?.communityIcon : Icons?.avatar;
  const styles = profileStyles(profileImage, groupName);
  const profileImageStyle = StyleSheet.flatten([
    styles.profile,
    customStyle,
    customImageStyles,
  ]);

  const profileContainerStyle = StyleSheet.flatten([
    styles.profileContainer,
    customStyle,
  ]);
  const onlineStatus =
    userStatus === strings.onlineStatus &&
    isChatHeader === appConstants.falseValue;

  return (
    <View style={profileContainerStyle} testID={'profile-image'}>
      {profileImage ? (
        <FastImage
          source={{
            uri: profileImage,
            cache: FastImage.cacheControl.immutable,
          }}
          style={profileImageStyle}
        />
      ) : (
        <Image
          source={defaultImage}
          style={[profileImageStyle, defaultUserImageStyle]}
        />
      )}
      {onlineStatus && <View style={styles.userStatus} />}
    </View>
  );
};

export default ProfileImage;
