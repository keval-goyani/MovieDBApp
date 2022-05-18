import React, { FC } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useDispatch } from 'react-redux';
import { ImmutableArray } from 'seamless-immutable';
import { DropDownMenu } from '../components';
import { appConstants, strings } from '../constants';
import dataAction from '../redux/movieRedux';
import { Color, Icons, moderateScale } from '../theme';
import styles from './styles/ListContainerStyles';

export interface listItemDataType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface listItemType {
  page: number;
  results: Array<listItemDataType>;
  total_pages: number;
  total_results: number;
}

export interface DataType {
  id: number;
  name: string;
}

export interface listContainerDataType {
  title: string;
  filterOptions: Array<DataType>;
  initialValue: DataType;
  data: ImmutableArray<listItemDataType>;
  fetchingState: boolean;
  errorState: boolean;
  listPage: number;
}

const ListContainer: FC<listContainerDataType> = ({
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
    const votePercentage = item?.vote_average * 10;
    const activeStrokeColor =
      item?.vote_average > 6.9
        ? Color.PercentageDarkGreen
        : Color.percentageDarkYellow;
    const inActiveStrokeColor =
      item?.vote_average > 6.9
        ? Color.PercentageLightGreen
        : Color.percentageLightYellow;
    const date = new Date(item?.release_date).toString().slice(4, 15);

    return (
      <View style={styles.listDataStyle}>
        <Image
          source={{
            uri: `${appConstants.posterImageUrl}${item?.poster_path}`,
          }}
          style={styles.card}
        />
        <TouchableOpacity style={styles.threeDotContainerStyles}>
          <Image
            source={Icons.threeDotIcon}
            style={styles.threeDotIconStyles}
          />
        </TouchableOpacity>
        <View style={styles.circularView}>
          <CircularProgress
            value={votePercentage}
            radius={18}
            circleBackgroundColor={Color.black}
            activeStrokeWidth={3}
            inActiveStrokeWidth={3}
            progressValueFontSize={moderateScale(11)}
            duration={800}
            activeStrokeColor={activeStrokeColor}
            inActiveStrokeColor={inActiveStrokeColor}
            inActiveStrokeOpacity={0.4}
            progressValueColor={Color.white}
            valueSuffix={'%'}
          />
        </View>

        <View style={styles.movieNameDateContainer}>
          <Text style={styles.movieNameStyle} numberOfLines={2}>
            {item?.title ?? item?.original_title}
          </Text>
          <Text style={styles.movieReleaseDate}>{date}</Text>
        </View>
      </View>
    );
  };

  const pageLoading = () => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(dataAction.whatsPopularDataRequest(listPage + 1));
        break;

      case strings.freeToWatch:
        dispatch(dataAction.freeToWatchDataRequest(listPage + 1));
        break;

      case strings.trending:
        dispatch(dataAction.trendingDataRequest(listPage + 1));
        break;
    }
  };

  return (
    <>
      {fetchingState && listPage === 1 ? (
        <ActivityIndicator size="large" style={styles.loadingStyle} />
      ) : !errorState ? (
        <View style={styles.movieListContainer}>
          <View style={styles.movieListTitleContainer}>
            <Text style={styles.fontStyle}>{title}</Text>
            <DropDownMenu data={filterOptions} initialValue={name} />
          </View>

          <FlatList
            data={movieListData}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={listItem}
            horizontal={true}
            bounces={false}
            onEndReachedThreshold={1}
            onEndReached={() => pageLoading()}
            ListFooterComponent={<ActivityIndicator size="small" />}
            ListFooterComponentStyle={styles.footerLoaderStyle}
          />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default ListContainer;
