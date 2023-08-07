import React from 'react';
import { Pressable, Text } from 'react-native';
import { CustomButtonDataType } from '../constants';

const CustomButton = ({
  onPress,
  buttonStyle,
  buttonTextStyle,
  buttonText, kw
}: CustomButtonDataType) => {
  return (
    <Pressable onPress={onPress} style={buttonStyle} testID={'button'}>
      <Text style={buttonTextStyle} testID={'button-text'}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
