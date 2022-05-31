import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  image: {
    height: verticalScale(300),
    width: horizontalScale(330),
    marginRight: horizontalScale(10),
    marginTop: verticalScale(20),
  },
  contentLoader: {
    marginTop: verticalScale(10),
  },
});

export default styles;
