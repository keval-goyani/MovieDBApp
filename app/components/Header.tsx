import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import {
  HeaderDataType,
  NavigationDataType,
  navigationStrings,
} from '../constants';
import styles from './styles/HeaderStyles';

const Header: FC<HeaderDataType> = ({
  leftIcon,
  logoIcon,
  rightIcon,
  searchModal = false,
  setSearchModal = () => {},
}) => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.Home);
        }}>
        <Image source={leftIcon} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Image source={logoIcon} />
      {rightIcon ? (
        <Pressable onPress={() => setSearchModal(!searchModal)}>
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </Pressable>
      ) : (
        <View style={styles.rightIconStyle} />
      )}
    </View>
  );
};

export default Header;
