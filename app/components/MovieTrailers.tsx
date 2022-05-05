import React, { FC } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropDownMenu } from '../components';
import { appConstants, strings } from '../constants';
import { Icons } from '../theme';
import { listContainerDataType, listItemDataType } from './ListContainer';
import styles from './styles/MovieTrailersStyle';

const MovieTrailer: FC<listContainerDataType> = ({
  title,
  filterOptions,
  initialValue,
  data,
}) => {
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
          <Text style={styles.movieNameStyle}>
            {item?.title ?? item?.original_title}
          </Text>
          <Text style={styles.officialTrailerStyle}>
            {strings.officialTrailer}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: appConstants.movieTrailerBackgroundImage,
      }}
      style={styles.movieListContainer}>
      <View style={styles.movieListTitleContainer}>
        <Text style={styles.fontStyle}>{title}</Text>
        <DropDownMenu
          data={filterOptions}
          initialValue={initialValue.name}
          dropDownViewStyle={styles.dropDownMainItemColor}
          dropDownTextStyle={styles.dropDownMainItemTextColor}
          dropDownTintStyle={styles.dropDownExpandIconColor}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={listItem}
        horizontal={true}
        bounces={false}
      />
    </ImageBackground>
  );
};

export default MovieTrailer;
