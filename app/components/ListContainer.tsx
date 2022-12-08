import React, { FC, useState } from 'react';
import {
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useDispatch } from 'react-redux';
import { DropDownMenu, List } from '../components';
import {
  appConstants,
  ListContainerDataType,
  ListItemDataType,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../constants';
import { WhatsPopluarActions, type AppDispatch } from '../redux';
import { Color, Icons, moderateScale } from '../theme';
import styles from './styles/ListContainerStyles';

export const movieListItem = (
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
  searchModal,
}) => {
  const [dataEndPoint, setDataEndPoint] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const movieListData = [...data];

  const pageLoading = () => {
    switch (title) {
      case strings.whatsPopular:
        dispatch(
          WhatsPopluarActions.popularData({
            urlMainPath: dataEndPoint,
            pageNo: listPage + 1,
          }),
        );
        break;
    }
  };

  return (
    <>
      {!errorState ? (
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
          <List
            fetching={fetchingState}
            listData={movieListData}
            searchModal={searchModal}
            pageHandler={pageLoading}
            footerStyle={styles.footerLoaderStyle}
          />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default ListContainer;
