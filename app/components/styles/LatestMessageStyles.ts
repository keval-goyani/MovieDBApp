import { StyleSheet } from 'react-native';
import { Color, horizontalScale, moderateScale } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastChatText: {
    fontSize: moderateScale(14),
    color: Color.darkBlue,
    marginLeft: horizontalScale(3),
  },
  iconStyle: {
    marginLeft: horizontalScale(2),
  },
  youText: {
    color: Color.darkBlue,
    fontSize: moderateScale(14),
  },
});
