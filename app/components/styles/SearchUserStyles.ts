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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.darkBlue,
    flexDirection: 'row',
    padding: moderateScale(5),
  },
  searchBox: {
    flex: 1,
    borderWidth: Metrics.borderLineWidth,
    backgroundColor: Color.white,
    borderColor: Color.black,
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
  },
  closeButton: {
    height: moderateScale(23),
    width: moderateScale(23),
    margin: moderateScale(4),
    tintColor: Color.red,
  },
});
