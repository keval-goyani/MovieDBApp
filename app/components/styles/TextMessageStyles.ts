import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const textMessageStyles = (isLeft: boolean) =>
  StyleSheet.create({
    messageContainer: {
      maxWidth: '80%',
      flexDirection: 'row',
      borderRadius: 10,
      paddingHorizontal: horizontalScale(10),
      paddingTop: verticalScale(5),
      paddingBottom: verticalScale(10),
    },
    messageView: {
      backgroundColor: Color.transparent,
      maxWidth: '80%',
    },
    senderName: {
      marginBottom: verticalScale(3),
    },
    timeView: {
      backgroundColor: Color.transparent,
      justifyContent: 'flex-end',
      paddingLeft: horizontalScale(10),
    },
    message: {
      color: isLeft ? Color.black : Color.white,
      alignSelf: 'flex-start',
      fontSize: moderateScale(14),
    },
    time: {
      color: isLeft ? Color.gray : Color.lightGrey,
      alignSelf: 'flex-end',
      fontSize: moderateScale(9),
    },
  });
