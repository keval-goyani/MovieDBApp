import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  movieListContainer: {
    marginVertical: verticalScale(18),
    paddingTop: verticalScale(15),
  },
  movieListTitleContainer: {
    marginBottom: verticalScale(8),
    paddingVertical: verticalScale(8),
    zIndex: 1,
  },
  fontStyle: {
    fontSize: moderateScale(23),
    fontWeight: '700',
    color: Color.white,
    marginLeft: horizontalScale(14),
  },
  listItemStyle: {
    alignItems: 'center',
    paddingBottom: verticalScale(25),
  },
  listItemImageStyle: {
    marginLeft: horizontalScale(14),
  },
  loadingStyle: {
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLoader: {
    marginTop: verticalScale(10),
  },
  card: {
    height: verticalScale(184),
    width: horizontalScale(300),
    borderRadius: moderateScale(10),
    backgroundColor: Color.darkBlue,
  },
  threeDotContainerStyles: {
    position: 'absolute',
    right: verticalScale(30),
    top: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    opacity: 0.5,
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  threeDotIconStyles: {
    height: moderateScale(15),
    width: moderateScale(15),
    opacity: 0.8,
  },
  playIconStyles: {
    position: 'absolute',
    top: verticalScale(37),
    left: horizontalScale(65),
    height: moderateScale(35),
    width: moderateScale(35),
    tintColor: Color.white,
  },
  dropDownMainItemColor: {
    backgroundColor: Color.dropDownGradientStart,
  },
  dropDownMainItemTextColor: {
    color: Color.darkBlue,
  },
  dropDownExpandIconColor: {
    tintColor: Color.darkBlue,
  },
  movieNameContainer: {
    alignItems: 'center',
    marginLeft: horizontalScale(18),
    marginTop: verticalScale(4),
    width: horizontalScale(300),
  },
  movieNameStyle: {
    fontWeight: '700',
    color: Color.white,
    fontSize: moderateScale(19),
  },
  officialTrailerStyle: {
    color: Color.white,
    fontSize: moderateScale(15),
    marginTop: verticalScale(4),
  },
  footerLoaderStyle: {
    marginRight: verticalScale(5),
    height: verticalScale(225),
    justifyContent: 'center',
  },
  image: {
    height: verticalScale(270),
    width: horizontalScale(330),
    marginBottom: verticalScale(20),
  },
});

export default styles;
