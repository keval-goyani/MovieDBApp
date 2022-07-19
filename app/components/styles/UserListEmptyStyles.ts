import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  emptyUserListContainer: {
    flex: 1,
  },
  noItemFoundImage: {
    alignSelf: 'center',
    height: moderateScale(250),
    width: moderateScale(250),
    margin: moderateScale(60),
  },
  description: {
    alignItems: 'center',
  },
  noItemFoundText: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    color: Color.lightBlue,
  },
  makeSureText: {
    color: Color.darkBlue,
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginHorizontal: horizontalScale(60),
    marginTop: verticalScale(10),
  },
});

export default styles;
