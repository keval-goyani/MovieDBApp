import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../theme';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginRight: horizontalScale(13),
    marginTop: verticalScale(10),
  },
  innerContainer: {
    marginTop: verticalScale(10),
    marginRight: horizontalScale(110),
  },
  secondContainer: {
    marginTop: verticalScale(10),
    marginRight: horizontalScale(62),
  },
});
