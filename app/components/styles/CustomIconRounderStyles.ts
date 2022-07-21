import { StyleSheet } from 'react-native';
import { Color, moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  iconList: {
    marginVertical: verticalScale(6),
    alignItems: 'center',
  },
  iconWrapper: {
    borderRadius: 23,
    backgroundColor: Color.white,
    padding: moderateScale(8),
  },
  icon: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  iconName: {
    fontSize: moderateScale(10),
    marginTop: verticalScale(2),
    color: Color.darkBlue,
  },
});

export default styles;
