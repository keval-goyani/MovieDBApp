import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  profileInfoContainer: {
    paddingVertical: verticalScale(10),
    backgroundColor: Color.white,
    width: Metrics.isAndroid ? horizontalScale(280) : horizontalScale(300),
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: Metrics.isAndroid ? Color.black : Color.lightGrey,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 2 },
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    elevation: 20,
  },
  profileImageContainer: {
    marginVertical: Metrics.isAndroid ? verticalScale(12) : verticalScale(15),
  },
  profileStyle: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: 50,
  },
  profileImageStyle: {
    height: moderateScale(70),
    width: moderateScale(70),
  },
  userNameContainer: {
    marginHorizontal: horizontalScale(50),
    marginVertical: Metrics.isAndroid ? verticalScale(1) : verticalScale(3),
  },
  userNameTextStyle: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: Color.darkBlue,
  },
  userEmailContainer: {
    marginVertical: verticalScale(2),
    marginHorizontal: horizontalScale(25),
  },
  emailTextStyle: {
    fontSize: moderateScale(13),
    color: Color.darkBlue,
  },

  groupDetailContainer: {
    flexDirection: 'row',
  },
  groupTextStyle: {
    fontSize: moderateScale(13),
    color: Color.darkestGray,
  },
  dotContainer: {
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(5),
  },
  dotStyle: {
    fontSize: moderateScale(4),
    fontWeight: '800',
    color: Color.darkestGray,
  },
  participantDetailsContainer: {
    flexDirection: 'row',
  },
  participantsCountContainer: {
    paddingRight: horizontalScale(4),
  },
  participantsCountText: {
    fontSize: moderateScale(13),
    color: Color.darkestGray,
  },
  participantsText: {
    fontSize: moderateScale(13),
    color: Color.darkestGray,
  },
});
