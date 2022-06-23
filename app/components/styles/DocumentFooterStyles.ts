import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  documentDetails: {
    height: verticalScale(17),
    width: horizontalScale(230),
    marginHorizontal: horizontalScale(7),
    flexDirection: 'row',
  },
  pageNo: {
    fontSize: moderateScale(10.5),
    marginLeft: horizontalScale(2.5),
    color: Color.darkBlue,
  },
  dotIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
    margin: moderateScale(1),
  },
  timeStyle: {
    color: Color.darkBlue,
    fontSize: moderateScale(9.5),
    marginLeft: horizontalScale(180),
    position: 'absolute',
  },
});
