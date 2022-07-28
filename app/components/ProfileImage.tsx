import React from 'react';
import { Image, View } from 'react-native';
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
  const ProfileImageStyle = [styles.profile, style];
  const onlineStatus =
    userStatus === strings.onlineStatus &&
    isChatHeader === appConstants.falseValue;

  return (
    <View style={[styles.profileContainer, style]}>
      {profileImage ? (
        <FastImage
          source={{
            uri: profileImage,
            cache: FastImage.cacheControl.immutable,
          }}
          style={ProfileImageStyle}
        />
      ) : (
        <Image source={defaultImage} style={ProfileImageStyle} />
      )}
      {onlineStatus && <View style={styles.userStatus} />}
    </View>
  );
};

export default ProfileImage;
