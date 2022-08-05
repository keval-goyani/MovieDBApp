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
    alignItems: 'center',
    marginBottom: verticalScale(3),
    overflow: 'hidden',
    // backgroundColor: 'pink',
  },
  itemContainer: {
    padding: moderateScale(13),
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  avatar: {
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: 30,
  },
  profileImageStyles: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  nameView: {
    width: horizontalScale(190),
    marginLeft: horizontalScale(8),
    marginTop: verticalScale(3),
    // backgroundColor: 'green',
  },
  adminContainer: {
    // backgroundColor: 'yellow',
    height: verticalScale(20),
    width: horizontalScale(72),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderColor: Color.darkBlue,
    borderWidth: 1,
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(10),
  },
  groupAdminText: {
    fontSize: moderateScale(10),
    color: Color.darkBlue,
    // backgroundColor: 'pink',
    // padding:moderateScale(3)
  },
  text: {
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: Color.darkBlue,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
    // backgroundColor: 'blue',
  },
  emailText: {
    textAlign: 'justify',
    fontSize: moderateScale(12),
    color: Color.darkestGray,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
    // backgroundColor: 'white',
  },
});
