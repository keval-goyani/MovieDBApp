import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: Color.lightBlue,
    borderRadius: 14,
  },
  documentIcon: {
    height: moderateScale(27),
    width: moderateScale(27),
    marginVertical: verticalScale(9),
    marginLeft: horizontalScale(10),
  },
  innerContainer: {
    backgroundColor: Color.transparentGray,
    borderRadius: 10,
    margin: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginLeft: horizontalScale(3),
    color: Color.darkBlue,
  },
  container: {
    alignSelf: 'flex-end',
    margin: moderateScale(10),
    borderRadius: 14,
    alignItems: 'center',
  },
  initialPage: {
    height: verticalScale(150),
    width: horizontalScale(230),
    margin: moderateScale(5),
    borderRadius: 10,
  },
  commonContainer: {
    backgroundColor: Color.lightBlue,
    borderRadius: 10,
    bottom: 0,
    width: horizontalScale(240),
  },
  fileNameContainer: {
    width: horizontalScale(175),
  },
  position: {
    position: 'absolute',
  },
});
