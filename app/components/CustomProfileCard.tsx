import React from 'react';
import { Text, View } from 'react-native';
import { CustomProfileCardProps, strings } from '../constants';
import ProfileImage from './ProfileImage';
import { styles } from './styles/CustomProfileCardStyles';

const CustomProfileCard = ({
  profileImage,
  username,
  isEmail,
  userEmail,
  arrayLength,
  groupName,
}: CustomProfileCardProps) => {
  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileImageContainer}>
        <ProfileImage
          {...{ profileImage, groupName }}
          customStyle={styles.profileStyle}
          defaultUserImageStyle={styles.profileImageStyle}
        />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameTextStyle} numberOfLines={1}>
          {username}
        </Text>
      </View>

      {isEmail ? (
        <View style={styles.userEmailContainer}>
          <Text style={styles.emailTextStyle} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>
      ) : (
        <View style={styles.groupDetailContainer}>
          <Text style={styles.groupTextStyle}>{strings.groupText}</Text>
          <View style={styles.dotContainer}>
            <Text style={styles.dotStyle}>{strings.dot}</Text>
          </View>
          <View style={styles.participantDetailsContainer}>
            <View style={styles.participantsCountContainer}>
              <Text style={styles.participantsCountText}>{arrayLength}</Text>
            </View>
            <Text style={styles.participantsText}>{strings.participants}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomProfileCard;
