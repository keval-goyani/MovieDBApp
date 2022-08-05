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
  renderItemContainer: {
    alignItems: 'center',
    marginHorizontal: horizontalScale(8),
  },
  outerImageContainer: {
    height: moderateScale(55),
    width: moderateScale(55),
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.lightBlue,
    borderWidth: moderateScale(2),
    margin: moderateScale(9),
  },
  avatar: {
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: 30,
  },
  userName: {
    fontSize: moderateScale(12),
    width: horizontalScale(60),
    textAlign: 'center',
    color: Color.darkBlue,
  },
  minusButton: {
    position: 'absolute',
    right: horizontalScale(8),
    top: verticalScale(10),
    borderColor: Color.white,
    borderWidth: moderateScale(2),
    borderRadius: 10,
  },
  ParticipantsContainer: {
    flex: 1,
    backgroundColor: Color.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(25),
    marginLeft: horizontalScale(25),
  },
  participantsText: {
    fontSize: moderateScale(25),
    color: Color.darkBlue,
  },
  participantsCountContainer: {
    backgroundColor: Color.lightBlue,
    marginLeft: horizontalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: verticalScale(2),
  },
  participantsCount: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: Color.darkBlue,
  },
  ProfilesContainer: {
    justifyContent: 'center',
    marginHorizontal: horizontalScale(12),
  },
});
