import React, { FC } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DropDownMenu } from '../components';
import { appConstants, strings } from '../constants';
import dataAction from '../redux/movieRedux';
import { Icons } from '../theme';
import { listContainerDataType, listItemDataType } from './ListContainer';
import styles from './styles/MovieTrailersStyle';

const MovieTrailer: FC<listContainerDataType> = ({
  title,
  filterOptions,
  initialValue,
  data,
  fetchingState,
  errorState,
  listPage,
}) => {
  const dispatch = useDispatch();
  const movieListData = [...data];
  const { name } = initialValue;
  const listItem = ({ item }: ListRenderItemInfo<listItemDataType>) => {
    return (
      <View style={styles.listItemStyle}>
        <View style={styles.listItemImageStyle}>
          <Image
            source={{
              uri: `${appConstants.backDropImageUrl}${item?.backdrop_path}`,
            }}
            style={styles.card}
          />
          <TouchableOpacity style={styles.threeDotContainerStyles}>
            <Image
              source={Icons.threeDotIcon}
              style={styles.threeDotIconStyles}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playIconStyles}>
            <Image source={Icons.playIcon} style={styles.playIconStyles} />
          </TouchableOpacity>
        </View>
        <View style={styles.movieNameContainer}>
          <Text style={styles.movieNameStyle} numberOfLines={1}>
            {item?.title ?? item?.original_title}
          </Text>
          <Text style={styles.officialTrailerStyle}>
            {strings.officialTrailer}
          </Text>
        </View>
      </View>
    );
  };

  const pageLoading = () => {
    dispatch(dataAction.latestTrailerDataRequest(listPage + 1));
  };

  return (
    <>
      {fetchingState && listPage === 1 ? (
        <ActivityIndicator size="large" style={styles.loadingStyle} />
      ) : !errorState ? (
        <ImageBackground
          source={{
            uri: appConstants.movieTrailerBackgroundImage,
          }}
          style={styles.movieListContainer}>
          <View style={styles.movieListTitleContainer}>
            <Text style={styles.fontStyle}>{title}</Text>
            <DropDownMenu
              data={filterOptions}
              initialValue={name}
              dropDownViewStyle={styles.dropDownMainItemColor}
              dropDownTextStyle={styles.dropDownMainItemTextColor}
              dropDownTintStyle={styles.dropDownExpandIconColor}
            />
          </View>

          <FlatList
            data={movieListData}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={listItem}
            horizontal={true}
            bounces={false}
            onEndReachedThreshold={1}
            onEndReached={() => pageLoading()}
            ListFooterComponent={
              <ActivityIndicator animating={fetchingState} />
            }
            ListFooterComponentStyle={styles.footerLoaderStyle}
          />
        </ImageBackground>
      ) : (
        <View />
      )}
    </>
  );
};

export default MovieTrailer;
