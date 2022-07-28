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
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: moderateScale(5),
  },
  shareLocationView: {
    height: verticalScale(150),
    width: horizontalScale(248),
    borderRadius: 10,
    overflow: 'hidden',
  },
  senderName: {
    color: Color.darkModerateMagenta,
    fontWeight: 'bold',
    paddingLeft: horizontalScale(6),
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  chatMap: {
    ...StyleSheet.absoluteFillObject,
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
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(10),
  },
  timeStyle: {
    color: Color.gray,
    alignSelf: 'flex-end',
    fontSize: moderateScale(9),
    right: 0,
    position: 'absolute',
  },
});
