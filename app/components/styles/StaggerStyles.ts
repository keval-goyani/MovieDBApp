import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: verticalScale(70),
    right: horizontalScale(80),
  },
  iconCamera: {
    backgroundColor: Color.lightIndigo,
    borderRadius: 30,
    padding: moderateScale(10),
  },
  iconGallery: {
    backgroundColor: Color.lightRed,
    borderRadius: 30,
    padding: moderateScale(10),
  },
  icon: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: Color.white,
  },
});
