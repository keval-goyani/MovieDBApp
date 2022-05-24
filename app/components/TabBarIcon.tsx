import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabBarIconDataType } from '../constants';
import { Color } from '../theme';
import styles from './styles/TabBarIconStyles';

const TabBarIcon: FC<TabBarIconDataType> = ({ focused, icon }) => {
  const imageStyle = StyleSheet.flatten([
    styles.tabIcon,
    { tintColor: focused ? Color.lightBlue : Color.white },
  ]);

  return <Image source={icon} style={imageStyle} />;
};

export default TabBarIcon;
