import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { navigationStrings } from '../constants';
import { NavigationDataType } from './ListContainer';
import styles from './styles/HeaderStyles';

interface HeaderDataType {
  leftIcon: ImageSourcePropType;
  logoIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
}

const Header: FC<HeaderDataType> = ({ leftIcon, logoIcon, rightIcon }) => {
  const navigation: NavigationDataType = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.HOME);
        }}>
        <Image source={leftIcon} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Image source={logoIcon} />
      {rightIcon ? (
        <Image source={rightIcon} style={styles.rightIconStyle} />
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
