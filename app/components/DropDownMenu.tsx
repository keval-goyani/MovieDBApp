import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { appConstants, DropDownDataType, strings } from '../constants';
import freeMovieAction from '../redux/FreeMovieRedux';
import popularAction from '../redux/PopularRedux';
import trailerAction from '../redux/TrailerRedux';
import trendingAction from '../redux/TrendingRedux';
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
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const [urlEndPoint, setUrlEndPoint] = useState(data?.[0]?.endPoint);
  const dispatch = useDispatch();

  const dropDownFilterData = useCallback(() => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(
          popularAction.whatsPopularDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        ); 
        
        break;
      case strings.freeToWatch:
        dispatch(
          freeMovieAction.freeToWatchDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
      case strings.latestTrailers:
        dispatch(
          trailerAction.latestTrailerDataRequest({
            urlMainPath: urlEndPoint,
            pageNo: appConstants.defaultPage,
          }),
        );
        break;
      case strings.trending:
        dispatch(
          trendingAction.trendingDataRequest({
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
