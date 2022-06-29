import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CustomIconRounderDataType } from '../constants';
import styles from './styles/CustomIconRounderStyles';

const CustomIconRounder: FC<CustomIconRounderDataType> = ({
  path,
  iconName,
  tintColor,
  onPress,
}) => {
  return (
    <View style={styles.iconList}>
      <TouchableOpacity style={styles.iconWraper} onPress={onPress}>
        <Image source={path} style={[styles.icon, tintColor]} />
      </TouchableOpacity>
      <Text style={styles.iconName}>{iconName}</Text>
    </View>
  );
};

export default CustomIconRounder;
