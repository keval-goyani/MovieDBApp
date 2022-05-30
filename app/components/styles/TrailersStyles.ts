import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: verticalScale(10),
    marginRight: horizontalScale(15),
  },
  footerLoaderStyle: {
    marginBottom: verticalScale(15),
  },
});

export default styles;
