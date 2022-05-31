import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  icon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    tintColor: Color.lightBlue,
    resizeMode: 'contain',
  },
  userEmail: {
    color: Color.blueGreen,
    fontSize: moderateScale(20),
  },
  label: {
    color: Color.lightBlue,
    fontSize: moderateScale(20),
  },
  scrollView: { backgroundColor: Color.darkBlue },
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
    height: verticalScale(100),
    width: horizontalScale(100),
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
});

export default styles;
