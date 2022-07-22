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
    marginVertical: verticalScale(1),
    padding: moderateScale(1),
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  cameraContainer: {
    backgroundColor: Color.transparentRoyalBlue,
    borderRadius: 30,
    padding: moderateScale(10),
    margin: moderateScale(2),
  },
  galleryContainer: {
    backgroundColor: Color.transparentRoyalBlue,
    borderRadius: 30,
    padding: moderateScale(10),
    margin: moderateScale(2),
  },
  cameraIconStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: Color.brightSkyBlue,
  },
  galleryIconStyle: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: Color.royalBlue,
  },
});
