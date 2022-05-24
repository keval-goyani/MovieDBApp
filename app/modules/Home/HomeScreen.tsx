import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, ListContainer, MovieTrailer } from '../../components';
import { filterData, strings } from '../../constants';
import { freeMovieSelectors } from '../../redux/FreeMovieRedux';
import { popularDataSelectors } from '../../redux/PopularRedux';
import { trailerDataSelectors } from '../../redux/TrailerRedux';
import { trendingSelectors } from '../../redux/TrendingRedux';
import { Icons } from '../../theme';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const {
    whatsPopularData,
    whatsPopularDataFetchingError,
    whatsPopularPage,
    fetchingWhatsPopularData,
  } = useSelector(popularDataSelectors.getData);
  const {
    freeToWatch,
    freeToWatchFetchingError,
    freeToWatchPage,
    fetchingFreeToWatch,
  } = useSelector(freeMovieSelectors.getData);
  const {
    latestTrailers,
    latestTrailersFetchingError,
    latestTrailersPage,
    fetchingLatestTrailers,
  } = useSelector(trailerDataSelectors.getData);
  const { trending, trendingPage, fetchingTrending, trendingFetchingError } =
    useSelector(trendingSelectors.getData);
  const {
    popularMovieFilterData,
    freeToWatchMovieFilterData,
    trailerFilterData,
    trendingFilterData,
  } = filterData;

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
      />
      <ScrollView bounces={false}>
        <ListContainer
          title={strings.whatsPopular}
          filterOptions={popularMovieFilterData}
          data={whatsPopularData ?? []}
          fetchingState={fetchingWhatsPopularData}
          errorState={whatsPopularDataFetchingError}
          listPage={whatsPopularPage}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={freeToWatchMovieFilterData}
          data={freeToWatch ?? []}
          fetchingState={fetchingFreeToWatch}
          errorState={freeToWatchFetchingError}
          listPage={freeToWatchPage}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={trailerFilterData}
          data={latestTrailers ?? []}
          fetchingState={fetchingLatestTrailers}
          errorState={latestTrailersFetchingError}
          listPage={latestTrailersPage}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={trendingFilterData}
          data={trending ?? []}
          fetchingState={fetchingTrending}
          errorState={trendingFetchingError}
          listPage={trendingPage}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
