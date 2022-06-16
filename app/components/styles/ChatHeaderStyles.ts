import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.darkBlue,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  leftIconStyle: {
    alignSelf: 'center',
    paddingHorizontal: horizontalScale(10),
    marginLeft: horizontalScale(5),
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: Color.white,
  },
  avatarImage: {
    height: moderateScale(65),
    width: moderateScale(65),
    borderRadius: 32,
  },
  profileView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  profile: { flexDirection: 'row', flex: 4, alignItems: 'center' },
  userNameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  username: {
    color: Color.white,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  onlineStatus: {
    color: Color.white,
    fontSize: moderateScale(16),
  },
});
