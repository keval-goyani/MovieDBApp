import React, { FC } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Header } from '../../components';
import { appConstants, movieDetails, strings } from '../../constants';
import { getDetails } from '../../services/Utils';
import { Color, Icons, moderateScale } from '../../theme';
import { styles } from './styles/DetailScreenStyles';

export interface RouteDataType {
  route: {
    params: { id: number };
  };
}

const DetailScreen: FC<RouteDataType> = ({ route }) => {
  /**
  const { params } = route;  <=== use for future prospect
  **/

  const {
    votePercentage,
    activeStrokeColor,
    inActiveStrokeColor,
    year,
    country,
    movieTitle,
    runTime,
    movieType,
    directorName,
  } = getDetails();

  return (
    <View style={styles.container}>
      <Header leftIcon={Icons.backIcon} logoIcon={Icons.movieDbIcon} />
      <ScrollView bounces={false}>
        <ImageBackground
          source={{
            uri: `${appConstants.backDropImageUrl}${movieDetails.backdrop_path}`,
          }}
          style={styles.backgroundImageContainer}>
          <Image
            source={{
              uri: `${appConstants.posterImageUrl}${movieDetails.poster_path}`,
            }}
            style={styles.posterImageStyle}
          />
        </ImageBackground>
        <View style={styles.descriptionTopContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle}>{movieTitle}</Text>
            <Text style={styles.movieYear}>{`(${year})`}</Text>
          </View>
          <View style={styles.voteTrailerContainer}>
            <View style={styles.alignVerticalStyle}>
              <CircularProgress
                value={votePercentage}
                radius={moderateScale(22)}
                circleBackgroundColor={Color.black}
                activeStrokeWidth={moderateScale(4)}
                inActiveStrokeWidth={moderateScale(4)}
                progressValueFontSize={moderateScale(13)}
                duration={800}
                activeStrokeColor={activeStrokeColor}
                inActiveStrokeColor={inActiveStrokeColor}
                inActiveStrokeOpacity={0.4}
                progressValueColor={Color.white}
                valueSuffix={'%'}
              />
              <Text style={styles.userScoreTextStyle}>{strings.userScore}</Text>
            </View>
            <Text style={styles.pipeStyle}>|</Text>
            <View style={styles.alignVerticalStyle}>
              <Image source={Icons.playIcon} style={styles.playButton} />
              <Text style={styles.playTrailerTextStyle}>
                {strings.playTrailer}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionMiddleContainer}>
          <View style={styles.dateHourContainer}>
            <Text style={styles.certificationTextStyle}>
              {strings.certification}
            </Text>
            <Text style={styles.movieDateStyle}>
              {`${movieDetails?.release_date ?? ''} (${country})`}
            </Text>
            <Text style={styles.dotTextStyle}>{strings.dot}</Text>
            <Text style={styles.movieDateStyle}>{runTime}</Text>
          </View>
          <Text style={styles.movieTypeStyle}>{movieType}</Text>
        </View>
        <View style={styles.descriptionBottomContainer}>
          <Text style={styles.taglineTextStyle}>
            {movieDetails?.tagline ?? ''}
          </Text>
          <Text style={styles.overviewTextStyle}>{strings.overview}</Text>
          <Text style={styles.overviewContentStyle}>
            {movieDetails?.overview ?? ''}
          </Text>
          <View style={styles.directorDataContainer}>
            <Text style={styles.directorName}>{directorName}</Text>
            <Text style={styles.directorTextStyle}>{strings.director}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
