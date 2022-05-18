import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { appConstants, strings } from '../constants';
import dataAction from '../redux/movieRedux';
import { Color, Icons } from '../theme';
import { DataType } from './ListContainer';
import styles from './styles/DropDownMenuStyles';

export interface dropDownDataType {
  data: Array<DataType>;
  title: string;
  initialValue: string;
  dropDownViewStyle?: StyleProp<ViewStyle>;
  dropDownTextStyle?: StyleProp<TextStyle>;
  dropDownTintStyle?: StyleProp<ImageStyle>;
}

const DropDownMenu: FC<dropDownDataType> = ({
  data,
  title,
  initialValue,
  dropDownViewStyle,
  dropDownTextStyle,
  dropDownTintStyle,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const [urlEndPoint, setUrlEndPoint] = useState(data?.[0]?.endPoint);
  const dispatch = useDispatch();

  const dropDownFilterData = useCallback(() => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(
          dataAction.whatsPopularDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
      case strings.freeToWatch:
        dispatch(
          dataAction.freeToWatchDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
      case strings.latestTrailers:
        dispatch(
          dataAction.latestTrailerDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
      case strings.trending:
        dispatch(
          dataAction.trendingDataRequest({
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

  const selectItem = (filterValue: string, endPoint: string) => {
    setShowOptions(false);
    setSelectedItem(filterValue);
    setUrlEndPoint(endPoint);
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
