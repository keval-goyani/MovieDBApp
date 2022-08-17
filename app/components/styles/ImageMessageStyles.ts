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
    resizeMode: 'contain',
    flex: 1,
    maxWidth: '44%',
    borderRadius: 10,
    padding: moderateScale(5),
  },
  senderName: {
    marginBottom: verticalScale(3),
  },
  chatImage: {
    height: verticalScale(200),
    width: horizontalScale(150),
  },
  chatImageRadius: {
    borderRadius: 10,
  },
  imageTime: {
    position: 'absolute',
    right: horizontalScale(4),
    bottom: 0,
  },
});

export default styles;
