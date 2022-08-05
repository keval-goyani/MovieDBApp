import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  commonGroupContainer: {
    backgroundColor: Color.white,
    // backgroundColor: 'pink',
    // height: verticalScale(400),
    // flex:1,
    shadowColor: Metrics.isAndroid ? Color.black : Color.lightGrey,
    elevation: 20,
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 2 },
    borderRadius: 15,
  },
  commonGroupHeader: {
    //  backgroundColor: 'gray',
    margin: moderateScale(10),
    flexDirection: 'row',
  },
  groupCount: {
    fontWeight: '500',
    color: Color.darkBlue,
  },
  commonGroupTitle: {
    //  backgroundColor: 'blue',
    marginLeft: horizontalScale(6),
  },
  commonGroupText: {
    fontWeight: '500',
    color: Color.darkBlue,
  },
  listContainer: {
    // backgroundColor: 'green',
  },
});
