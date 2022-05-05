import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  dropDownContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    backgroundColor: Color.lightGreen,
    marginHorizontal: horizontalScale(40),
    marginVertical: verticalScale(4),
    borderRadius: moderateScale(19),
    borderWidth: moderateScale(1),
    overflow: 'hidden',
  },
  dropDownMainItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Color.darkBlue,
    width: horizontalScale(135),
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(18),
  },
  dropDownListItem: {
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(22),
  },
  dropDownMainTextStyle: {
    color: Color.dropDownGradientStart,
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
  dropDownListTextStyle: {
    color: Color.darkBlue,
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
  expandIconStyle: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginTop: verticalScale(3),
    tintColor: Color.dropDownGradientStart,
  },
});

export default styles;
