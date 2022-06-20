import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.lightGreen,
    padding: moderateScale(10),
    position: 'absolute',
    right: horizontalScale(10),
    top: verticalScale(20),
    width: horizontalScale(200),
    zIndex: 1,
  },
  menuItem: {
    color: Color.darkBlue,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
