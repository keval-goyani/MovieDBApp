import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
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
import { DropDownMenu, Loader } from '../components';
import {
  appConstants,
  ListContainerDataType,
  ListItemDataType,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../constants';
import freeMovieAction from '../redux/FreeMovieRedux';
import popularAction from '../redux/PopularRedux';
import trendingAction from '../redux/TrendingRedux';
import { Color, Icons, moderateScale } from '../theme';
import styles from './styles/ListContainerStyles';

export const listItem = (
  { item }: ListRenderItemInfo<ListItemDataType>,
  navigation: NavigationDataType,
) => {
  const votePercentage = item?.vote_average * 10;
  const activeStrokeColor =
    item?.vote_average > 6.9
      ? Color.PercentageDarkGreen
      : Color.percentageDarkYellow;
  const inActiveStrokeColor =
    item?.vote_average > 6.9
      ? Color.PercentageLightGreen
      : Color.percentageLightYellow;
  const date = new Date(item?.release_date ?? item?.first_air_date)
    .toString()
    .slice(4, 15);
  const movieTitle = item?.title ?? item?.name;

  return (
    <TouchableOpacity
      style={styles.listDataStyle}
      onPress={() => {
        navigation.navigate(navigationStrings.Details, {
          id: item?.id,
          data: item?.first_air_date ?? '',
        });
      }}>
      <Image
        source={{
          uri: `${appConstants.posterImageUrl}${item?.poster_path}`,
        }}
        style={styles.card}
      />
      <TouchableOpacity style={styles.threeDotContainerStyles}>
        <Image source={Icons.threeDotIcon} style={styles.threeDotIconStyles} />
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
          {movieTitle}
        </Text>
        <Text style={styles.movieReleaseDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListContainer: FC<ListContainerDataType> = ({
  title,
  filterOptions,
  data,
  fetchingState,
  errorState,
  listPage,
}) => {
  const [dataEndPoint, setDataEndPoint] = useState<string>('');
  const dispatch = useDispatch();
  const navigation: NavigationDataType = useNavigation();
  const movieListData = [...data];

  const pageLoading = () => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(
          popularAction.whatsPopularDataRequest({
            urlMainPath: dataEndPoint,
            pageNo: listPage + 1,
          }),
        );
        break;
      case strings.freeToWatch:
        dispatch(
          freeMovieAction.freeToWatchDataRequest({
            urlMainPath: dataEndPoint,
            pageNo: listPage + 1,
          }),
        );
        break;
      case strings.trending:
        dispatch(
          trendingAction.trendingDataRequest({
            urlMainPath: dataEndPoint,
            pageNo: listPage + 1,
          }),
        );
        break;
    }
  };

  return (
    <>
      {fetchingState && movieListData.length === 0 ? (
        <ActivityIndicator size="large" style={styles.loadingStyle} />
      ) : !errorState ? (
        <View style={styles.movieListContainer}>
          <View style={styles.movieListTitleContainer}>
            <Text style={styles.fontStyle}>{title}</Text>
            <DropDownMenu
              data={filterOptions ? filterOptions : []}
              title={title ? title : ''}
              dropDownViewStyle={styles.dropDownTitleBackgroundColor}
              setMethod={setDataEndPoint}
            />
          </View>
          {!fetchingState && movieListData.length === 0 ? (
            <View style={styles.loadingStyle}>
              <Image source={Icons.notFound} style={styles.image} />
            </View>
          ) : (
            <FlatList
              data={movieListData}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={item => listItem(item, navigation)}
              horizontal
              bounces={false}
              onEndReachedThreshold={1}
              onEndReached={() => pageLoading()}
              ListFooterComponent={
                <Loader size="small" animating={fetchingState} />
              }
              ListFooterComponentStyle={styles.footerLoaderStyle}
            />
          )}
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default ListContainer;
