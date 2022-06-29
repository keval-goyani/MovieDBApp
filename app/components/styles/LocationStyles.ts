import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareLocationContainer: {
    backgroundColor: Color.lightBlue,
    height: verticalScale(200),
    width: horizontalScale(260),
    alignSelf: 'flex-end',
    borderRadius: 10,
    alignItems: 'center',
  },
  shareLocationView: {
    height: verticalScale(150),
    width: horizontalScale(248),
    borderRadius: 11,
    margin: moderateScale(6),
    overflow: 'hidden',
  },
  chatMap: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  stopButtonStyle: {
    alignItems: 'center',
    height: verticalScale(31),
    width: horizontalScale(248),
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    paddingLeft: horizontalScale(73),
    color: Color.red,
  },
  locationEnded: {
    color: Color.gray,
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(2),
  },
  timeStyle: {
    color: Color.gray,
    alignSelf: 'flex-end',
    fontSize: moderateScale(9),
    marginLeft: horizontalScale(198),
    position: 'absolute',
  },
});
