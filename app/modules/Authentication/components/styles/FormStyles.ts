import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../../theme';

export const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  formView: { justifyContent: 'center', alignItems: 'center' },
  input: {
    borderWidth: Metrics.borderLineWidth,
    borderColor: Color.gray,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(18),
    borderRadius: 10,
    backgroundColor: Color.white,
    marginVertical: verticalScale(10),
    width: horizontalScale(300),
  },
  errorMessage: {
    color: Color.red,
    width: horizontalScale(300),
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  submit: {
    width: horizontalScale(200),
    alignItems: 'center',
    marginVertical: verticalScale(12),
  },
  submitText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: Color.white,
  },
  linearGradient: { borderRadius: 10, marginVertical: verticalScale(20) },
});
