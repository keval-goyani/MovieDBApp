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
    marginTop: verticalScale(10),
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: verticalScale(150),
    backgroundColor: Color.transparentSky,
    top: 0,
    left: 0,
  },
  iconStyle: {
    position: 'absolute',
    right: horizontalScale(18),
  },
});
