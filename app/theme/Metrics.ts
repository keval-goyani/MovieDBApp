import { Dimensions, Platform, StatusBar } from 'react-native';

let { width, height } = Dimensions.get('window');

if (width > height) {
  [width, height] = [height, width];
}

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const Metrics = {
  zero: 0,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  textFieldRadius: 5,
  borderLineWidth: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusBarHeight: StatusBar.currentHeight,
  imageRadius: 20,
  isAndroid: Platform.OS === 'android',
  behavior: Platform.OS === 'android' ? 'height' : 'padding',
};

export { horizontalScale, verticalScale, moderateScale, Metrics };
