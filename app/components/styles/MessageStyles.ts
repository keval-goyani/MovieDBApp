import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
  },
  messageContainer: {
    maxWidth: '80%',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(10),
    backgroundColor: Color.lightBlue,
    alignSelf: 'flex-end',
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: horizontalScale(10),
  },
  message: {
    color: Color.white,
    alignSelf: 'flex-start',
    fontSize: moderateScale(15),
  },
  time: {
    color: Color.lightGrey,
    alignSelf: 'flex-end',
    fontSize: moderateScale(9),
  },
});
