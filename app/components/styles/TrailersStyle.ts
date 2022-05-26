import { StyleSheet } from 'react-native';
import { Color, horizontalScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGreen,
    paddingTop: verticalScale(10),
    paddingRight: horizontalScale(14),
  },
});

export default styles;
