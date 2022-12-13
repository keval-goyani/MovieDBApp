import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { appConstants, DropDownDataType, strings } from '../constants';
import { WhatsPopluarActions, type AppDispatch } from '../redux';
import { Color, Icons } from '../theme';
import styles from './styles/DropDownMenuStyles';

const DropDownMenu: FC<DropDownDataType> = ({
  data,
  title,
  dropDownViewStyle,
  dropDownTextStyle,
  dropDownTintStyle,
  setMethod,
}) => {
  const initialValue = data?.[0].name;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(initialValue);
  const [urlEndPoint, setUrlEndPoint] = useState<string>(data?.[0]?.endPoint);
  const dispatch = useDispatch<AppDispatch>();

  const dropDownFilterData = useCallback(() => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(
          WhatsPopluarActions.popularData({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
    }
  }, [dispatch, title, urlEndPoint]);

  useEffect(() => {
    dropDownFilterData();
  }, [dropDownFilterData]);

  useEffect(() => {
    setMethod(urlEndPoint);
  }, [setMethod, urlEndPoint]);

  const selectItem = (filterValue: string, endPoint: string) => {
    setShowOptions(false);
    setSelectedItem(filterValue);
    setUrlEndPoint(endPoint);
  };

  useEffect(() => {
    showOptions &&
      setTimeout(() => {
        setShowOptions(false);
      }, 5000);
  }, [showOptions]);

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
              .map(({ name, id, endPoint }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => selectItem(name, endPoint)}
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
