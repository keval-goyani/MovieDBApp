import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderColor: Color.lightGrey,
    borderBottomWidth: Metrics.borderLineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: moderateScale(20),
    marginBottom: verticalScale(3),
  },
  profileContainer: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
  profile: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: 30,
    resizeMode: 'contain',
  },
  userStatus: {
    position: 'absolute',
    bottom: verticalScale(2),
    left: horizontalScale(42),
    backgroundColor: Color.onlineStatusColor,
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Color.white,
  },
  text: {
    textAlign: 'justify',
    fontWeight: '700',
    fontSize: moderateScale(17),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  dateText: {
    textAlign: 'right',
    fontSize: moderateScale(15),
    color: Color.black,
  },
  nameView: {
    width: horizontalScale(190),
    marginLeft: horizontalScale(10),
  },
  dateView: {
    width: horizontalScale(100),
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
