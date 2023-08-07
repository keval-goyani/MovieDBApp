export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  popToTop: jest.fn(),
  addListener: jest.fn().mockImplementation((str, cb) => cb()),
  pop: jest.fn(),
  getParam: jest.fn(),
  push: jest.fn(),
};

const useRoute = jest.fn(val => val);
// const useFocusEffect = jest.fn();
const useIsFocused = jest.fn(val => val);
const useNavigation = () => navigation;
const setFocus = jest.fn();
const createNavigationContainerRef = jest.fn();
const DefaultTheme = {};

const CommonActions = { reset: jest.fn() };
const StackActions = {
  pop: jest.fn(),
};

export {
  useRoute,
  useNavigation,
  // useFocusEffect,
  useIsFocused,
  setFocus,
  createNavigationContainerRef,
  DefaultTheme,
  CommonActions,
  StackActions,
};
