import { StyleSheet } from 'react-native';
import {
  Color,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

const paddingInputBox = Metrics.isAndroid ? 0 : verticalScale(10);
const inputHeight = Metrics.isAndroid ? verticalScale(50) : verticalScale(25);

export const styles = StyleSheet.create({
  container: { justifyContent: 'center', backgroundColor: Color.white },
  innerContainer: {
    paddingHorizontal: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
  },
  inputAndSend: {
    flexDirection: 'row',
    backgroundColor: Color.offWhite,
    flex: 1,
    marginRight: horizontalScale(10),
    paddingVertical: paddingInputBox,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: horizontalScale(20),
    fontSize: moderateScale(15),
    height: inputHeight,
    maxHeight: verticalScale(100),
    color: Color.black,
    flex: 1,
  },
  sendButtonView: {
    backgroundColor: Color.darkBlue,
    borderRadius: 50,
    height: moderateScale(50),
    width: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: Color.white,
  },
  inputIcon: {
    height: moderateScale(23),
    width: moderateScale(23),
    tintColor: Color.gray,
    marginRight: horizontalScale(10),
  },
});
