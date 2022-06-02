import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  listItem: {
    width: Metrics.screenWidth,
    borderColor: Color.black,
    borderBottomWidth: Metrics.borderLineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: moderateScale(20),
    marginBottom: verticalScale(3),
  },
  avatar: {
    height: verticalScale(60),
    width: horizontalScale(60),
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'justify',
    fontSize: moderateScale(15),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  dateText: {
    textAlign: 'right',
    fontSize: moderateScale(15),
    color: Color.black,
  },
  nameView: {
    width: horizontalScale(190),
    marginLeft: horizontalScale(10),
  },
  dateView: { width: horizontalScale(100) },
});
