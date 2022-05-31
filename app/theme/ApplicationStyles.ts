import { StyleSheet } from 'react-native';
import { Color, horizontalScale, moderateScale } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkBlue,
  },
  icon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  labelStyle: {
    marginLeft: horizontalScale(-20),
    fontSize: moderateScale(15),
  },
});
