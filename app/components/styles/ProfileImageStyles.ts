import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  profileContainer: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
  profile: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: 30,
  },
  userStatus: {
    position: 'absolute',
    bottom: verticalScale(2),
    right: horizontalScale(2),
    backgroundColor: Color.leafyGreen,
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: 7,
    borderWidth: moderateScale(2),
    borderColor: Color.white,
  },
});

export default styles;
