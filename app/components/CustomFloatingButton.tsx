import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { NavigationDataType, navigationStrings } from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/CustomFloatingButtonStyles';

const CustomFloatingButton = () => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate(navigationStrings.ChatMessage)}>
        <View style={styles.buttonContainer}>
          <Image source={Icons.plus} style={styles.plusIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFloatingButton;
