import React, { FC, useState } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color, Icons } from '../theme';
import { DataType } from './ListContainer';
import styles from './styles/DropDownMenuStyles';

export interface dropDownDataType {
  data: Array<DataType>;
  initialValue: string;
  dropDownViewStyle?: StyleProp<ViewStyle>;
  dropDownTextStyle?: StyleProp<TextStyle>;
  dropDownTintStyle?: StyleProp<ImageStyle>;
}

const DropDownMenu: FC<dropDownDataType> = ({
  data,
  initialValue,
  dropDownViewStyle,
  dropDownTextStyle,
  dropDownTintStyle,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const selectItem = (name: string) => {
    setShowOptions(false);
    setSelectedItem(name);
  };

  return (
    <View style={styles.dropDownContainer}>
      <LinearGradient
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 0 }}
        colors={[Color.dropDownGradientStart, Color.dropDownGradientEnd]}>
        <TouchableOpacity
          style={[styles.dropDownMainItem, dropDownViewStyle]}
          onPress={() => setShowOptions(!showOptions)}
          activeOpacity={0.8}>
          <Text style={[styles.dropDownMainTextStyle, dropDownTextStyle]}>
            {selectedItem}
          </Text>
          <Image
            source={Icons.expandIcon}
            style={[styles.expandIconStyle, dropDownTintStyle]}
          />
        </TouchableOpacity>
        {showOptions ? (
          <View>
            {data
              .filter(item => item.name !== selectedItem)
              .map(({ name, id }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => selectItem(name)}
                  style={styles.dropDownListItem}>
                  <Text style={styles.dropDownListTextStyle}>{name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ) : (
          <View />
        )}
      </LinearGradient>
    </View>
  );
};

export default DropDownMenu;
