import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CustomHyperlinkDataType } from '../constants';
import { styles } from './styles/CustomHyperlinkStyles';

const CustomHyperlink = ({
  linkTitle,
  hyperlinkTitle,
  onPress,
}: CustomHyperlinkDataType) => {
  return (
    <>
      <Text style={styles.headerText}>{linkTitle}</Text>
      <TouchableOpacity style={styles.linkTextView} onPress={onPress}>
        <Text style={styles.linkText}>{hyperlinkTitle}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomHyperlink;
