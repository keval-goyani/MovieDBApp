import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: Color.white,
    flex: 1,
    marginTop: verticalScale(100),
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
  },
  DetailsContainer: {
    // backgroundColor: 'pink',
    flex: 1,
    paddingTop: Metrics.isAndroid ? verticalScale(132) : verticalScale(110),
    marginHorizontal: horizontalScale(12),
    // height: Metrics.screenHeight,
  },
  statusContainer: {
    paddingVertical: verticalScale(10),
    backgroundColor: Color.white,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    shadowColor: Metrics.isAndroid ? Color.black : Color.lightGrey,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 2 },
    borderRadius: 12,
    elevation: 20,
    marginBottom: verticalScale(10),
  },
  statusDetailContainer: {
    //  backgroundColor: 'red',
    margin: moderateScale(2),
    marginHorizontal: horizontalScale(10),
  },
  statusTextContainer: {
    // backgroundColor: 'pink',
    marginVertical: verticalScale(4),
  },
  statusTextStyle: {
    fontSize: moderateScale(14),
    color: Color.darkBlue,
    // fontWeight:''
  },
  dateContainer: {
    // backgroundColor: 'pink',
  },
  dateContainerCommonTextStyle: {
    fontSize: moderateScale(10.5),
    color: Color.darkestGray,
  },
  groupCreateDetailsContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
  },
  groupCreatorContainer: {
    //  backgroundColor: 'pink',
    paddingHorizontal: horizontalScale(4),
  },
  groupCreatedDateContainer: {
    paddingRight: horizontalScale(4),
  },
  mediaContainer: {
    backgroundColor: Color.white,
    // backgroundColor: 'pink',
    height: Metrics.isAndroid ? verticalScale(130) : verticalScale(112),
    marginBottom: verticalScale(10),
    shadowColor: Metrics.isAndroid ? Color.black : Color.lightGrey,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 2 },
    borderRadius: 12,
    elevation: 20,
  },
  mediaHeader: {
    // backgroundColor: 'blue',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaTextStyle: {
    fontWeight: '600',
    color: Color.darkBlue,
  },
  mediaCountContainer: {
    // backgroundColor: 'pink',
    marginRight: horizontalScale(5),
  },
  mediaCount: {
    color: Color.darkestGray,
  },
  mediaList: {
    // backgroundColor: 'red',
    paddingHorizontal: horizontalScale(4),
  },
  ImageStyle: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: 10,
  },
 
});
