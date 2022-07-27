import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstContainer: {
    backgroundColor: Color.graySmoke,
    flex: 0.77,
    width: Metrics.screenWidth,
    height: verticalScale(400),
  },
  modalContainer: {
    flex: 0.23,
    backgroundColor: Color.darkBlue,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(8),
    paddingHorizontal: horizontalScale(15),
  },
  profileText: {
    fontSize: moderateScale(20),
    color: Color.white,
    textAlign: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    right: horizontalScale(9),
    bottom: verticalScale(4),
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsContainer: {
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionsText: {
    fontSize: moderateScale(11),
    color: Color.white,
  },
  iconStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: Color.darkBlue,
  },
  cameraContainer: {
    backgroundColor: Color.transparentRoyalBlue,
    borderRadius: 40,
    padding: moderateScale(15),
    margin: moderateScale(2),
  },
  galleryContainer: {
    backgroundColor: Color.transparentPurple,
    borderRadius: 40,
    padding: moderateScale(15),
    margin: moderateScale(2),
  },
  cameraIconStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    tintColor: Color.brightSkyBlue,
  },
  galleryIconStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    tintColor: Color.royalBlue,
  },
});
