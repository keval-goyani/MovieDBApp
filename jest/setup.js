jest.mock('../app/theme', () => ({
  Color: {},
  Metrics: {},
  verticalScale: jest.fn(),
  moderateScale: jest.fn(),
  horizontalScale: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(),
  });
});

jest.mock('@react-native-firebase/storage', () => {
  return () => ({
    storage: jest.fn(),
  });
});

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    auth: jest.fn(),
  });
});

jest.mock('@react-navigation/drawer', () => {
  return () => ({
    DrawerContentScrollView: jest.fn(),
    DrawerItem: jest.fn(),
  });
});

// jest.mock('@react-navigation/native', () => {
//   const navigation =
//   return {
//     ...jest.requireActual('@react-navigation/native'),
//     useNavigation: jest.fn().mockReturnValue({
//       navigation: jest.fn().mockReturnValue({
//         goBack: jest.fn(),
//         navigate: jest.fn(),
//       }),
//     }),
//     useFocusEffect: jest.fn(() => ({})),
//   };
// });

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ({})),
}));
