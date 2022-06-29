import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Color.black,
  },
  modalView: {
    justifyContent: 'center',
  },
  fullImage: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    resizeMode: 'contain',
  },
  backIconStyle: {
    height: moderateScale(22),
    width: moderateScale(22),
    tintColor: Color.white,
  },
  imageDescription: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    width: Metrics.screenWidth,
    paddingLeft: horizontalScale(15),
    zIndex: 1,
    backgroundColor: Color.transparentGray,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  description: {
    marginLeft: horizontalScale(25),
    marginVertical: verticalScale(8),
  },
  username: {
    fontSize: moderateScale(16),
    color: Color.white,
    fontWeight: '800',
  },
  fullImageTime: {
    color: Color.white,
    fontSize: moderateScale(14),
    marginTop: verticalScale(2),
  },
});

export default styles;
