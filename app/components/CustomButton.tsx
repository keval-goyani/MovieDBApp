import React from 'react';
import { Pressable, Text } from 'react-native';
import { CustomButtonDataType } from '../constants';

const CustomButton = ({
  onPress,
  buttonStyle,
  buttonTextStyle,
  buttonText,
}: CustomButtonDataType) => {
  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;
