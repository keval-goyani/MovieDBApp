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
  style,
  isChatHeader = appConstants.falseValue,
}: ProfileImageDataType) => {
  const defaultImage = groupName ? Icons.communityIcon : Icons.avatar;
  const styles = profileStyles(profileImage, groupName);
  const profileImageStyle = StyleSheet.flatten([styles.profile, style]);
  const profileContainerStyle = StyleSheet.flatten([
    styles.profileContainer,
    style,
  ]);
  const onlineStatus =
    userStatus === strings.onlineStatus &&
    isChatHeader === appConstants.falseValue;

  return (
    <View style={profileContainerStyle}>
      {profileImage ? (
        <FastImage
          source={{
            uri: profileImage,
            cache: FastImage.cacheControl.immutable,
          }}
          style={profileImageStyle}
        />
      ) : (
        <Image source={defaultImage} style={profileImageStyle} />
      )}
      {onlineStatus && <View style={styles.userStatus} />}
    </View>
  );
};

export default ProfileImage;
