import React from 'react';

jest.mock('../app/theme', () => ({
  Color: {
    darkBlue: '#0d253f',
    lightBlue: '#01b4e4',
    lightGreen: '#90cea1',
    white: '#FFFFFF',
    black: '#000000',
    PercentageDarkGreen: '#21d07a',
    PercentageLightGreen: '#204529',
    percentageDarkYellow: '#d2d531',
    percentageLightYellow: '#423d0f',
    gray: '#808080',
    transparentGray: '#80808099',
    dropDownGradientStart: '#96f6ca',
    dropDownGradientEnd: '#0edbb0',
    lightBlackBackgroundColor: '#191918',
    blackBackgroundColor: '#161615',
    red: '#FF0D06',
    pistachioWhite: '#dceccf',
    pistachioTint: '#cae2b7',
    pistachioDark: '#b8d8a0',
    greenest: '#93c572',
    etonBlue: '#8cd2c4',
    blueGreen: '#32d9cb',
    pistachioMoreDark: '#96C8A2',
    skyBlue: '#87e7eb',
    blue: '#00bfff',
    lightGrey: '#BBCFD5',
    offWhite: '#f0f0f0',
    lightSky: '#87cefa90',
    powderBlue: '#87cefa40',
    lightIndigo: '#5C5FE0',
    lightRed: '#E44041',
    transparent: 'transparent',
    darkGray: '#A9A9A9',
    transParentBlue: '#01b4e466',
    deepPink: '#ff0080',
    royalBlue: '#2B23C6',
    purple: '#642CB8',
    brightSkyBlue: '#09B2E6',
    transparentPink: '#FFEBF8',
    transparentRoyalBlue: '#EBF4FF',
    transparentPurple: '#F9EDFF',
    transparentSky: '#04c6ff1a',
    statusbarGray: '#7F7F7F',
    graySmoke: '#000000aa',
    leafyGreen: '#51B73B',
    blueLagoon: '#85E6EB',
    transparentDarkBlue: '#0d253f99',
    salmon: '#FA8072',
    darkModerateMagenta: '#853a76',
    darkCyan: '#288BA0',
    raspberry: '#E30B5C',
    axolotl: '#546747',
    transparentGrey: '#c1c6c520',
    darkestGray: '#505050',
  },
  Icons: {
    menuIcon: require('../app/assets/icons'),
    searchIcon: require('../app/assets/icons'),
    movieDbIcon: require('../app/assets/icons'),
    expandIcon: require('../app/assets/icons'),
    threeDotIcon: require('../app/assets/icons'),
    playIcon: require('../app/assets/icons'),
    backIcon: require('../app/assets/icons'),
    movieDbIcon3x: require('../app/assets/icons'),
    movieDbIcon2x: require('../app/assets/icons'),
    homeIcon: require('../app/assets/icons/homeIcon.png'),
    trailerIcon: require('../app/assets/icons'),
    moviesIcon: require('../app/assets/icons/moviesIcon.png'),
    communityIcon: require('../app/assets/icons'),
    notFound: require('../app/assets/icons'),
    comingSoon: require('../app/assets/icons'),
    logout: require('../app/assets/icons'),
    trending: require('../app/assets/icons/trending.png'),
    tv: require('../app/assets/icons/tv.png'),
    avatar: require('../app/assets/icons'),
    chatBackground: require('../app/assets/icons'),
    send: require('../app/assets/icons'),
    location: require('../app/assets/icons'),
    camera: require('../app/assets/icons'),
    attach: require('../app/assets/icons'),
    dotMenu: require('../app/assets/icons'),
    documentIcon: require('../app/assets/icons'),
    fullStop: require('../app/assets/icons'),
    imageDocument: require('../app/assets/icons'),
    videoDocument: require('../app/assets/icons'),
    pdfDocument: require('../app/assets/icons'),
    pptDocument: require('../app/assets/icons'),
    document: require('../app/assets/icons'),
    plus: require('../app/assets/icons/plusSign.png'),
    close: require('../app/assets/icons'),
    noItemFound: require('../app/assets/icons'),
    locationIcon: require('../app/assets/icons'),
    fileIcon: require('../app/assets/icons/fileIcon.png'),
    cameraIcon: require('../app/assets/icons'),
    galleryIcon: require('../app/assets/icons'),
  },
  Metrics: {},
  verticalScale: jest.fn(),
  moderateScale: jest.fn(),
  horizontalScale: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      onSnapshot: jest.fn(),
      get: jest.fn(),
    })),
  });
});

jest.mock('@react-native-firebase/storage', () => {
  const putFileMock = jest.fn(() =>
    Promise.resolve({ metadata: { name: 'mocked-image.png' } }),
  );
  const getDownloadURLMock = jest.fn(() =>
    Promise.resolve('https://example.com/mocked-image.png'),
  );

  const storage = jest.fn(() => ({
    ref: jest.fn().mockReturnThis(),
    putFile: putFileMock,
    getDownloadURL: getDownloadURLMock,
  }));

  return storage;
});

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: jest.fn(() => Promise.resolve()),
  });
});

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/drawer', () => {
  const { View, Image } = require('react-native');
  const createDrawerNavigator = props => <View>{props.children}</View>;
  const DrawerContentScrollView = props => <View>{props.children}</View>;
  const DrawerItem = props => <View>{props.children}</View>;

  return {
    __esModule: true,
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
  };
});

jest.mock('react-native-document-picker', () => ({
  // Mock the documentPicker function
  documentPicker: jest.fn(),
}));

jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');

  const FastImage = ({ source, style }) => {
    return <View style={style}>{/* Render an image component here */}</View>;
  };

  FastImage.prefetch = jest.fn();
  FastImage.cacheControl = {
    immutable: 'immutable',
  };

  return FastImage;
});

jest.mock('react-native/Libraries/Modal/Modal', () => {
  const { View } = require('react-native');

  const Modal = props => <View>{props.children}</View>;
  return Modal;
});

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('@react-navigation/native', () => {
  const { useEffect } = require('react');
  const actualModule = jest.requireActual('@react-navigation/native');

  return {
    ...actualModule,
    useFocusEffect: useEffect,
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ({})),
}));

jest.mock('react-native-system-setting', () => {
  return {
    isLocationEnabled: jest.fn(),
    switchLocation: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

// jest.mock('react-native-system-setting', () => {
//   return {
//     // __esModule: true,
//     default: jest.fn().mockReturnValue({
//       isLocationEnabled: jest.fn().mockReturnValue(true),
//       switchLocation: jest.fn(),
//     }),
//   };
// });
// jest.mock('react-native-system-setting', () => ({
//   default: {
//     isLocationEnabled: jest.fn(),
//   },
// }));

jest.mock('react-native-text-ticker', () => {
  const TextTicker = jest.fn(props => {
    return null;
  });
  return TextTicker;
});

// it will disable the warning of 'useNativeDriver'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
