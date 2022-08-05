import { StyleSheet } from 'react-native';
import { Color } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkBlue,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContainer: {
    flex: 0.8,
  },
  componentsContainer: {
    backgroundColor: Color.darkBlue,
    flex: 0.2,
  },
});
