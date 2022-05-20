import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  movieListContainer: {
    marginTop: verticalScale(14),
    paddingVertical: verticalScale(8),
    marginLeft: horizontalScale(14),
  },
  movieListTitleContainer: {
    paddingVertical: verticalScale(8),
    zIndex: 1,
  },
  fontStyle: {
    fontSize: moderateScale(23),
    fontWeight: '700',
    color: Color.black,
  },
  dropDownTitleBackgroundColor: {
    backgroundColor: Color.darkBlue,
  },
  loadingStyle: {
    height: verticalScale(300),
  },
  listDataStyle: {
    marginVertical: verticalScale(10),
  },
  card: {
    height: verticalScale(225),
    width: horizontalScale(139),
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(20),
    backgroundColor: Color.darkBlue,
  },
  threeDotContainerStyles: {
    position: 'absolute',
    right: horizontalScale(30),
    top: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    opacity: 0.5,
    padding: moderateScale(3),
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(15),
  },
  threeDotIconStyles: {
    height: '100%',
    width: '100%',
    opacity: 0.8,
  },
  circularView: {
    position: 'absolute',
    left: horizontalScale(15),
    top: verticalScale(204),
  },
  movieNameDateContainer: {
    width: horizontalScale(130),
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(18),
  },
  movieNameStyle: {
    fontWeight: '800',
    color: Color.black,
    fontSize: moderateScale(15),
  },
  movieReleaseDate: {
    color: Color.gray,
    fontSize: moderateScale(15),
  },
  footerLoaderStyle: {
    marginRight: horizontalScale(5),
    height: verticalScale(225),
    justifyContent: 'center',
  },
});

export default styles;
