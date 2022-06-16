import { StyleSheet } from 'react-native';
import { moderateScale } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
});
