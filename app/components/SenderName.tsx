import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SenderNameDataType } from '../constants';
import styles from './styles/SenderNameStyles';

const SenderName = ({ senderName, senderStyle }: SenderNameDataType) => {
  const senderNameStyle = StyleSheet.flatten([styles.senderName, senderStyle]);

  return (
    <>{!!senderName && <Text style={senderNameStyle}>{senderName}</Text>}</>
  );
};

export default SenderName;
