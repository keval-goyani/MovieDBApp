import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  searchView: {
    height: verticalScale(60),
    width: Metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.darkBlue,
    flexDirection: 'row',
    padding: moderateScale(5),
  },
  searchBox: {
    width: horizontalScale(250),
    borderWidth: Metrics.borderLineWidth,
    backgroundColor: Color.white,
    borderColor: Color.black,
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
  },
  cancel: { color: Color.red, fontSize: moderateScale(18) },
});
