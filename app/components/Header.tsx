import React, { FC } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { HeaderDataType } from '../constants';
import styles from './styles/HeaderStyles';

const Header: FC<HeaderDataType> = ({
  leftIcon,
  logoIcon,
  rightIcon,
  searchModal = false,
  onPress,
  setSearchModal = () => {},
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
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
