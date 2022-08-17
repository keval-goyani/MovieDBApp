import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const documentMessageStyles = (isLeft: boolean) =>
  StyleSheet.create({
    thumbnail: {
      backgroundColor: isLeft ? Color.pistachioDark : Color.lightBlue,
      borderRadius: 14,
    },
    documentIcon: {
      height: moderateScale(27),
      width: moderateScale(27),
      marginVertical: verticalScale(9),
      marginLeft: horizontalScale(10),
    },
    senderName: {
      marginTop: verticalScale(3),
      marginLeft: horizontalScale(8),
    },
    innerContainer: {
      backgroundColor: Color.transparentGray,
      borderRadius: 10,
      margin: moderateScale(5),
      flexDirection: 'row',
      alignItems: 'center',
    },
    fileName: {
      marginLeft: horizontalScale(3),
      color: Color.darkBlue,
    },
    container: {
      borderRadius: 14,
      alignItems: 'center',
    },
    initialPage: {
      height: verticalScale(150),
      width: horizontalScale(230),
      margin: moderateScale(5),
      borderRadius: 10,
    },
    commonContainer: {
      backgroundColor: isLeft ? Color.pistachioDark : Color.lightBlue,
      borderRadius: 10,
      bottom: 0,
      width: horizontalScale(240),
    },
    fileNameContainer: {
      width: horizontalScale(175),
    },
    position: {
      position: 'absolute',
    },
  });
