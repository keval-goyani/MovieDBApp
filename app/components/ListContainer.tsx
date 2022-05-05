import React, { FC } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { DropDownMenu } from '../components';
import { appConstants } from '../constants';
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

export interface DataType {
  id: number;
  name: string;
}

export interface listContainerDataType {
  title: string;
  filterOptions: Array<DataType>;
  initialValue: DataType;
  data: Array<listItemDataType>;
}

const ListContainer: FC<listContainerDataType> = ({
  title,
  filterOptions,
  initialValue,
  data,
}) => {
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
          <Text style={styles.movieNameStyle}>
            {item?.original_title ?? item?.original_title}
          </Text>
          <Text style={styles.movieReleaseDate}>{date}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.movieListContainer}>
      <View style={styles.movieListTitleContainer}>
        <Text style={styles.fontStyle}>{title}</Text>
        <DropDownMenu data={filterOptions} initialValue={initialValue.name} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={listItem}
        horizontal={true}
        bounces={false}
      />
    </View>
  );
};

export default ListContainer;
