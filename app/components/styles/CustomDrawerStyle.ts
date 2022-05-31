import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.darkBlue,
  },
  logOutIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    marginLeft: horizontalScale(30),
    tintColor: Color.blue,
    resizeMode: 'contain',
  },
  logOutStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logOutText: {
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(30),
    color: Color.blue,
    fontWeight: '500',
  },
  touchable: {
    paddingVertical: verticalScale(12),
    borderRadius: 4,
    marginHorizontal: horizontalScale(8),
    marginBottom: verticalScale(20),
  },
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: verticalScale(50),
    width: horizontalScale(250),
    marginHorizontal: horizontalScale(10),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  icon: {
    height: moderateScale(25),
    width: moderateScale(25),
    tintColor: Color.lightBlue,
    resizeMode: 'contain',
    marginLeft: horizontalScale(20),
  },
  userEmail: {
    color: Color.blueGreen,
    fontSize: moderateScale(20),
  },
  label: {
    color: Color.lightBlue,
    fontSize: moderateScale(20),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarView: {
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(10),
    borderColor: Color.white,
    borderBottomWidth: verticalScale(3),
    backgroundColor: Color.darkBlue,
  },
  avatar: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
});

export default styles;
