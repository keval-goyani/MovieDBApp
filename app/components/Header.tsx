import React from 'react';
import { Image, View } from 'react-native';
import { Icons } from '../theme';
import styles from './styles/HeaderStyles';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={Icons.menuIcon} style={styles.menuIconStyle} />
      <Image source={Icons.movieDbIcon} />
      <Image source={Icons.searchIcon} style={styles.searchIconStyle} />
    </View>
  );
};

export default Header;
