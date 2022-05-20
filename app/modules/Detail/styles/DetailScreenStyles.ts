import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightBlackBackgroundColor,
  },
  backgroundImageContainer: {
    height: verticalScale(210),
    paddingLeft: horizontalScale(10),
    justifyContent: 'center',
  },
  posterImageStyle: {
    height: verticalScale(130),
    width: horizontalScale(85),
    borderRadius: moderateScale(10),
  },
  descriptionTopContainer: {
    paddingVertical: verticalScale(8),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
  },
  movieTitle: {
    color: Color.white,
    fontSize: moderateScale(23),
    fontWeight: '400',
    paddingBottom: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
  },
  movieYear: {
    color: Color.white,
    fontSize: moderateScale(19),
  },
  voteTrailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: verticalScale(5),
  },
  alignVerticalStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userScoreTextStyle: {
    color: Color.white,
    fontWeight: '900',
    fontSize: moderateScale(15),
    paddingLeft: horizontalScale(8),
  },
  pipeStyle: {
    color: Color.white,
    fontSize: moderateScale(25),
  },
  playButton: {
    height: moderateScale(12),
    width: moderateScale(12),
    tintColor: Color.white,
  },
  playTrailerTextStyle: {
    color: Color.white,
    fontSize: moderateScale(15),
    fontWeight: '700',
    paddingLeft: horizontalScale(8),
  },
  descriptionMiddleContainer: {
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    backgroundColor: Color.black,
  },
  dateHourContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(5),
  },
  certificationTextStyle: {
    color: Color.gray,
    fontWeight: '700',
    fontSize: moderateScale(15),
    padding: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Color.gray,
    textAlign: 'center',
  },
  movieDateStyle: {
    color: Color.white,
    fontWeight: '600',
    fontSize: moderateScale(15),
    paddingLeft: horizontalScale(8),
  },
  dotTextStyle: {
    color: Color.white,
    fontSize: moderateScale(8),
    paddingLeft: horizontalScale(8),
  },
  movieTypeStyle: {
    color: Color.white,
    fontWeight: '600',
    paddingTop: verticalScale(3),
    fontSize: moderateScale(15),
  },
  descriptionBottomContainer: {
    paddingVertical: verticalScale(15),
    paddingLeft: horizontalScale(18),
  },
  taglineTextStyle: {
    color: Color.white,
    fontStyle: 'italic',
    fontSize: moderateScale(15),
    paddingBottom: verticalScale(8),
  },
  overviewTextStyle: {
    color: Color.white,
    fontSize: moderateScale(18),
    fontWeight: '700',
    paddingBottom: verticalScale(8),
  },
  overviewContentStyle: {
    color: Color.white,
    fontSize: moderateScale(15),
    marginBottom: verticalScale(30),
  },
  directorDataContainer: {
    marginTop: verticalScale(30),
  },
  directorName: {
    color: Color.white,
    fontWeight: '800',
    fontSize: moderateScale(15),
  },
  directorTextStyle: {
    color: Color.white,
    fontSize: moderateScale(14),
  },
});
