import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  GroupSubjectContainer: {
    flex: 1,
  },
  firstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.isAndroid ? verticalScale(250) : verticalScale(230),
  },
  linearContainer: {
    flex: 1,
  },
  outerContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    borderColor: Color.darkBlue,
    borderWidth: moderateScale(1.7),
  },
  usersContainer: {
    height: moderateScale(85),
    width: moderateScale(85),
    backgroundColor: Color.darkBlue,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultGroupIcon: {
    height: moderateScale(55),
    width: moderateScale(55),
    tintColor: Color.lightBlue,
  },
  groupImageStyle: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: 50,
  },
  editOuterContainer: {
    position: 'absolute',
    top: Metrics.isAndroid ? verticalScale(68) : verticalScale(57),
    left: horizontalScale(65),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: Color.blueLagoon,
    borderWidth: moderateScale(2),
  },
  editButtonContainer: {
    backgroundColor: Color.darkBlue,
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: 20,
  },
  editButton: {
    padding: moderateScale(4),
  },
  GroupDetailsContainer: {
    marginVertical: verticalScale(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(60),
  },
  textInputStyle: {
    borderBottomColor: Color.darkBlue,
    borderBottomWidth: moderateScale(0.5),
    marginBottom: verticalScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.isAndroid ? moderateScale(0.5) : moderateScale(1.5),
    textAlign: 'center',
  },
  groupDescriptionText: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    marginTop: Metrics.isAndroid ? verticalScale(10) : verticalScale(16),
    color: Color.darkBlue,
  },
  floatingButtonStyle: {
    bottom: Metrics.isAndroid ? verticalScale(10) : verticalScale(25),
  },
});
