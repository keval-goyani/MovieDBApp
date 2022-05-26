import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(20),
  },
  footerLoaderStyle: {
    marginBottom: verticalScale(5),
  },
});

export default styles;
