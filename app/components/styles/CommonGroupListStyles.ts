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
    borderColor: Color.lightGrey,
    borderBottomWidth: Metrics.borderLineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(3),
    overflow: 'hidden',
  },
  itemContainer: {
    padding: moderateScale(13),
    flexDirection: 'row',
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
  text: {
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  lastChatText: {
    textAlign: 'justify',
    fontSize: moderateScale(12),
    color: Color.black,
    marginLeft: horizontalScale(10),
    paddingBottom: verticalScale(2),
  },
  nameView: {
    width: horizontalScale(190),
    marginLeft: horizontalScale(8),
    marginTop: verticalScale(3),
  },
});
