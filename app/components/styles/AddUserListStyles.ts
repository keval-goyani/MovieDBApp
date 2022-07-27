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
  },
  itemContainer: {
    padding: moderateScale(20),
    flexDirection: 'row',
  },
  profileContainer: {
    height: moderateScale(60),
    width: moderateScale(60),
    zIndex: 1,
  },
  profile: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: 30,
    resizeMode: 'contain',
  },
  userStatus: {
    position: 'absolute',
    bottom: verticalScale(21),
    left: horizontalScale(62),
    backgroundColor: Color.onlineStatusColor,
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Color.white,
    zIndex: 1,
  },
  text: {
    textAlign: 'justify',
    fontWeight: '700',
    fontSize: moderateScale(17),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  lastChatText: {
    textAlign: 'justify',
    fontSize: moderateScale(13),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  nameView: {
    width: horizontalScale(190),
    marginLeft: horizontalScale(10),
    // backgroundColor:'red',
    marginTop: verticalScale(10),
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Color.transparentSky,
    top: 0,
    left: 0,
  },
  iconStyle: {
    position: 'absolute',
    right: horizontalScale(18),
  },
});
