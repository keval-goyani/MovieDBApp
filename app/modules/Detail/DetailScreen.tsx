import { useNavigation } from '@react-navigation/native';
import React, { useEffect, type FC } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import {
  appConstants,
  strings,
  type NavigationDataType,
  type RouteDataType,
} from '../../constants';
import {
  DetailAction,
  DetailSelector,
  type AppDispatch,
  type DetailDataType,
  type RootStateType,
} from '../../redux';
import { getDetails } from '../../services';
import { Color, Icons, moderateScale } from '../../theme';
import { styles } from './styles/DetailScreenStyles';

const DetailScreen: FC<RouteDataType> = ({ route }) => {
  const {
    params: { id, data },
  } = route;
  const apiEndPoint =
    data === ''
      ? `${appConstants.moviePath}${id}${appConstants.apiKey}${appConstants.appendResponseOfCredit}`
      : `${appConstants.tvPath}${id}${appConstants.apiKey}${appConstants.appendResponseOfCredit}`;
  const dispatch = useDispatch<AppDispatch>();
  const navigation: NavigationDataType = useNavigation();
  const { detailData } = useSelector<RootStateType, DetailDataType>(
    DetailSelector.getDetailData,
  );

  useEffect(() => {
    dispatch(DetailAction.detailData(apiEndPoint));
  }, [apiEndPoint, dispatch]);

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
  } = getDetails(detailData);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.backIcon}
        logoIcon={Icons.movieDbIcon}
        onPress={() => navigation.goBack()}
      />
      <ScrollView bounces={false}>
        <ImageBackground
          source={{
            uri: `${appConstants.backDropImageUrl}${detailData?.backdrop_path}`,
          }}
          style={styles.backgroundImageContainer}>
          <Image
            source={{
              uri: `${appConstants.posterImageUrl}${detailData?.poster_path}`,
            }}
            style={styles.posterImageStyle}
          />
        </ImageBackground>
        <View style={styles.descriptionTopContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle}>
              {movieTitle}
              <Text style={styles.movieYear}>{`(${year})`}</Text>
            </Text>
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
              {`${
                detailData?.release_date ?? detailData?.first_air_date ?? ''
              } ${country}`}
            </Text>
            <Text style={styles.dotTextStyle}>{strings.dot}</Text>
            <Text style={styles.movieDateStyle}>{runTime}</Text>
          </View>
          <Text style={styles.movieTypeStyle}>{movieType}</Text>
        </View>
        <View style={styles.descriptionBottomContainer}>
          {detailData?.tagline ? (
            <Text style={styles.taglineTextStyle}>{detailData?.tagline}</Text>
          ) : (
            <View />
          )}
          {detailData?.overview ? (
            <>
              <Text style={styles.overviewTextStyle}>{strings.overview}</Text>
              <Text style={styles.overviewContentStyle}>
                {detailData?.overview}
              </Text>
            </>
          ) : (
            <View />
          )}
          <Text style={styles.directorName}>{directorName}</Text>
          {directorName === '' ? (
            <View />
          ) : (
            <Text style={styles.directorTextStyle}>{strings.director}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
