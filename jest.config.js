module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'native.tsx',
    'web.tsx',
  ],
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-system-setting)/)',
    'node_modules/(?!(@react-native|react-native|react-native-linear-gradient)/)',
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',

    // 'node_modules/(?!(@react-native|react-native|react-native-maps)/)',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/app/assets',
    '<rootDir>/app/constants',
    '<rootDir>/app/theme',
    '<rootDir>/app/translations',
    '<rootDir>/jest/__mock__',
  ],
  moduleNameMapper: {
    'react-native-permissions':
      '<rootDir>/jest/__mock__/react-native-permissions.js',
    'rn-fetch-blob': '<rootDir>/jest/__mock__/rn-fetch-blob.js',
    'react-native-file-viewer':
      '<rootDir>/jest/__mock__/react-native-file-viewer.js',
    'react-native-image-picker':
      '<rootDir>/jest/__mock__/react-native-image-picker.js',
    // 'react-native-system-setting':
    //   '<rootDir>/jest/__mock__/react-native-system-setting.js',
    'react-native-linear-gradient':
      '<rootDir>/jest/__mock__/react-native-linear-gradient.js',
    'react-native-circular-progress-indicator':
      '<rootDir>/jest/__mock__/react-native-circular-progress-indicator.js',
    'react-native-maps': '<rootDir>/jest/__mock__/react-native-maps.js',
    '@react-navigation/native':
      '<rootDir>/jest/__mock__/@react-navigation/native.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
};
