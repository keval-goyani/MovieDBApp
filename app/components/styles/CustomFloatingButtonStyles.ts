import { StyleSheet } from 'react-native';
import { Color, moderateScale } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: moderateScale(25),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    height: moderateScale(45),
    width: moderateScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.darkBlue,
    borderRadius: 100,
  },
  plusIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: Color.lightBlue,
  },
});
