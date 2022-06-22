import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  headerText: {
    color: Color.white,
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  linkText: {
    color: Color.lightBlue,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  linkTextView: {
    width: horizontalScale(200),
    alignSelf: 'center',
  },
});
