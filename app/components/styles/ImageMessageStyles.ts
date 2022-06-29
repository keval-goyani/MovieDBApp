import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  time: {
    color: Color.white,
    alignSelf: 'flex-end',
    fontSize: moderateScale(9),
  },
  chatImageContainer: {
    flexDirection: 'row',
    resizeMode: 'contain',
    flex: 1,
    maxWidth: '44%',
    borderRadius: 10,
  },
  chatImage: {
    margin: moderateScale(7),
    height: verticalScale(200),
    width: horizontalScale(150),
  },
  imageTime: {
    position: 'absolute',
    right: horizontalScale(3),
    bottom: 0,
  },
});

export default styles;
