import React, { FC, useState } from 'react';
import {
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DropDownMenu, List } from '../components';
import {
  appConstants,
  filterData,
  ListContainerDataType,
  ListItemDataType,
  strings,
} from '../constants';
import { type AppDispatch, LatestTrailerAction } from '../redux';
import { Icons } from '../theme';
import styles from './styles/MovieTrailersStyles';

export const trailerListItem = ({
  item,
}: ListRenderItemInfo<ListItemDataType>) => {
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
  searchModal,
}) => {
  const { trailerFilterData } = filterData;
  const [dataEndPoint, setDataEndPoint] = useState<string>(
    trailerFilterData[0].endPoint,
  );
  const dispatch = useDispatch<AppDispatch>();
  const trailerListData = [...data];

  const pageLoading = () => {
    dispatch(
      LatestTrailerAction.latestTrailerData({
        urlMainPath: dataEndPoint,
        pageNo: listPage + 1,
      }),
    );
  };

  return (
    <>
      {!errorState ? (
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
          <List
            fetching={fetchingState}
            listData={trailerListData}
            searchModal={searchModal}
            pageHandler={pageLoading}
            latestSkeletonStyle={styles.latestSkeleton}
            footerStyle={styles.footerLoaderStyle}
            listType={strings.latestTrailers}
          />
        </ImageBackground>
      ) : (
        <View />
      )}
    </>
  );
};

export default MovieTrailer;
