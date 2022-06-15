import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  emptyUserListContainer: {
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  userNotFoundText: {
    fontWeight: '500',
    fontSize: moderateScale(20),
  },
});

export default styles;
