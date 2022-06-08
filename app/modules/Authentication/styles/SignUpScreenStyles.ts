import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: verticalScale(50),
    alignSelf: 'center',
  },
});
