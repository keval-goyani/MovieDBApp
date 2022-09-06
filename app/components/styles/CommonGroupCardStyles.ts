import { StyleSheet } from 'react-native';
import { Color, horizontalScale, Metrics, moderateScale } from '../../theme';

export const styles = StyleSheet.create({
  commonGroupContainer: {
    backgroundColor: Color.white,
    shadowColor: Metrics.isAndroid ? Color.black : Color.lightGrey,
    elevation: 20,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 2 },
    borderRadius: 15,
  },
  commonGroupHeader: {
    margin: moderateScale(10),
    flexDirection: 'row',
  },
  groupCount: {
    fontWeight: '500',
    color: Color.darkBlue,
  },
  commonGroupTitle: {
    marginLeft: horizontalScale(6),
  },
  commonGroupText: {
    fontWeight: '500',
    color: Color.darkBlue,
  },
});
