import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DropDownMenu } from '../components';
import {
  appConstants,
  filterData,
  ListContainerDataType,
  ListItemDataType,
  strings
} from '../constants';
import trailerAction from '../redux/TrailerRedux';
import { Icons } from '../theme';
import styles from './styles/MovieTrailersStyle';

export const listItem = ({ item }: ListRenderItemInfo<ListItemDataType>) => {
  const trailerTitle = item?.title ?? item?.name;

  return (
    <View style={styles.listItemStyle}>
      <View style={styles.listItemImageStyle}>
        <Image
          source={{
            uri: `${appConstants.backDropImageUrl}${item?.backdrop_path}`,
          }}
          style={styles.card}
        />
        <TouchableOpacity
          style={styles.threeDotContainerStyles}
          onPress={() => {
            /* TODO add menu pop here */
          }}>
          <Image
            source={Icons.threeDotIcon}
            style={styles.threeDotIconStyles}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playIconStyles}
          onPress={() => {
            /* TODO add menu pop here */
          }}>
          <Image source={Icons.playIcon} style={styles.playIconStyles} />
        </TouchableOpacity>
      </View>
      <View style={styles.movieNameContainer}>
        <Text style={styles.movieNameStyle} numberOfLines={1}>
          {trailerTitle}
        </Text>
        <Text style={styles.officialTrailerStyle}>
          {strings.officialTrailer}
        </Text>
      </View>
    </View>
  );
};

const MovieTrailer: FC<ListContainerDataType> = ({
  title,
  filterOptions,
  data,
  fetchingState,
  errorState,
  listPage,
}) => {
  const { trailerFilterData } = filterData;
  const [dataEndPoint, setDataEndPoint] = useState<string>(
    trailerFilterData[0].endPoint,
  );
  const dispatch = useDispatch();
  const movieListData = [...data];

  const pageLoading = () => {
    dispatch(
      trailerAction.latestTrailerDataRequest({
        urlMainPath: dataEndPoint,
        pageNo: listPage + 1,
      }),
    );
  };

  return (
    <>
      {fetchingState && movieListData.length === 0 ? (
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
              data={filterOptions ?? []}
              title={title ?? ''}
              dropDownTextStyle={styles.dropDownMainItemTextColor}
              dropDownTintStyle={styles.dropDownExpandIconColor}
              setMethod={setDataEndPoint}
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
