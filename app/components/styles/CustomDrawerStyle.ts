import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
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
  },
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileView: {
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(10),
    borderColor: Color.white,
    borderBottomWidth: verticalScale(3),
  },
  profileImageContainer: {
    flex: 1,
  },
  profile: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: 50,
  },
  profileBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(4),
    borderColor: Color.lightBlue,
  },
  defaultProfile: {
    height: moderateScale(55),
    width: moderateScale(55),
    tintColor: Color.lightBlue,
  },
  scrollView: {
    backgroundColor: Color.darkBlue,
  },
  logOutButtonContainer: {
    marginTop: verticalScale(Metrics.screenHeight / 5),
  },
  editProfileButton: {
    position: 'absolute',
    backgroundColor: Color.blueGreen,
    borderRadius: 20,
    bottom: 0,
    right: 0,
  },
  editIcon: {
    margin: moderateScale(3),
  },
});

export default styles;
