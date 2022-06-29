import { StyleSheet } from 'react-native';
import { Color, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(70),
    backgroundColor: Color.offWhite,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: verticalScale(6),
  },
  cameraTintColor: {
    tintColor: Color.lightRed,
  },
  galleryTintColor: {
    tintColor: Color.lightIndigo,
  },
});

export default styles;
