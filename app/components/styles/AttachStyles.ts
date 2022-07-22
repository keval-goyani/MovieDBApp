import { StyleSheet } from 'react-native';
import { Color, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(70),
    backgroundColor: Color.white,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: verticalScale(6),
  },
  cameraTintColor: {
    tintColor: Color.brightSkyBlue,
  },
  galleryTintColor: {
    tintColor: Color.royalBlue,
  },
  locationTintColor: {
    tintColor: Color.deepPink,
  },
  documentTintColor: {
    tintColor: Color.purple,
  },
  locationBackgroundColor: {
    backgroundColor: Color.transparentPink,
  },
  galleryBackgroundColor: {
    backgroundColor: Color.transparentRoyalBlue,
  },
  documentBackgroundColor: {
    backgroundColor: Color.transparentPurple,
  },
  cameraBackgroundColor: {
    backgroundColor: Color.transparentSky,
  },
});

export default styles;
