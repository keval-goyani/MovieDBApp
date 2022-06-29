import { StyleSheet } from 'react-native';
import { Color, horizontalScale } from '../../theme';

export const messagePosition = (isLeft: boolean) =>
  StyleSheet.create({
    contentPosition: {
      backgroundColor: isLeft ? Color.pistachioDark : Color.lightBlue,
      alignSelf: isLeft ? 'flex-start' : 'flex-end',
      marginHorizontal: horizontalScale(10),
      borderTopStartRadius: isLeft ? 0 : 10,
      borderTopEndRadius: isLeft ? 10 : 0,
    },
  });
