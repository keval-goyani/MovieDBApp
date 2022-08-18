import { StyleSheet } from 'react-native';
import { Color, horizontalScale, moderateScale } from '../../theme';

export const profileStyles = (
  profileImage: string | undefined,
  groupName: string | undefined,
) => {
  const defaultImageSize = groupName ? moderateScale(35) : moderateScale(30);
  const iconSize = profileImage ? moderateScale(60) : defaultImageSize;

  return StyleSheet.create({
    profileContainer: {
      height: moderateScale(60),
      width: moderateScale(60),
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.darkBlue,
      borderWidth: profileImage ? 0 : moderateScale(3),
      borderColor: Color.lightBlue,
    },
    profile: {
      height: iconSize,
      width: iconSize,
      borderRadius: profileImage ? 30 : 0,
      tintColor: Color.lightBlue,
    },
    userStatus: {
      position: 'absolute',
      bottom: 0,
      left: horizontalScale(41),
      backgroundColor: Color.leafyGreen,
      height: moderateScale(14),
      width: moderateScale(14),
      borderRadius: 7,
      borderWidth: moderateScale(2),
      borderColor: Color.white,
    },
  });
};
