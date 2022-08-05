import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import Check from 'react-native-vector-icons/AntDesign';
import { CustomFloatingButtonProps, strings } from '../constants';
import { Color, Icons, moderateScale } from '../theme';
import { styles } from './styles/CustomFloatingButtonStyles';

const CustomFloatingButton = ({
  buttonType,
  onPress,
  groupButtonStyle,
}: CustomFloatingButtonProps) => {
  const floatingContainer = StyleSheet.flatten([
    styles.container,
    groupButtonStyle,
  ]);
  return (
    <View style={floatingContainer}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={styles.buttonContainer}>
          {buttonType === strings.plus ? (
            <Image source={Icons.plus} style={styles.plusIcon} />
          ) : (
            <Check
              name={strings.check}
              size={moderateScale(25)}
              color={Color.lightBlue}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFloatingButton;
