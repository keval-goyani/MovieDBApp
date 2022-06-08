import { StyleSheet } from 'react-native';
import { Color, horizontalScale, moderateScale } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  shareButton: {
    backgroundColor: Color.darkBlue,
    padding: moderateScale(10),
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    paddingLeft: horizontalScale(8),
    color: Color.white,
  },
  imageContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    backgroundColor: Color.dropDownGradientEnd,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    height: moderateScale(30),
    width: moderateScale(30),
    tintColor: Color.darkBlue,
  },
});
