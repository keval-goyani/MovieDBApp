import { StyleSheet } from 'react-native';
import { Color, horizontalScale, Metrics, moderateScale } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastChatText: {
    width: Metrics.isAndroid ? horizontalScale(148) : horizontalScale(168),
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
