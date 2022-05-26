import { StyleSheet } from 'react-native';
import { horizontalScale, Metrics, verticalScale } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: horizontalScale(300),
    height: verticalScale(300),
  },
  image: {
    height: Metrics.screenHeight,
    paddingTop: verticalScale(170),
    alignItems: 'center',
  },
});

export default styles;
