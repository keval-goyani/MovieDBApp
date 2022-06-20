import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(17),
    backgroundColor: Color.darkBlue,
    paddingHorizontal: horizontalScale(12),
  },
  leftIconStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: Color.white,
  },
  rightIconStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: Color.lightBlue,
  },
  headerTitleStyle: {
    color: Color.white,
    fontWeight: '700',
    fontSize: moderateScale(17),
  },
});

export default styles;
