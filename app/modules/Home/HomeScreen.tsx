import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ListContainer, MovieTrailer } from '../../components';
import { filterData, strings } from '../../constants';
import {
  FreeToWatchSelector,
  LatestTrailerSelector,
  TrendingSelector,
  WhatsPopularSelector,
} from '../../redux';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const {
    whatsPopularData,
    fetchingWhatsPopularData,
    whatsPopularDataFetchingError,
    whatsPopularPage,
  } = useSelector(WhatsPopularSelector.getWhatsPopularData);

  const {
    freeToWatch,
    freeToWatchFetchingError,
    freeToWatchPage,
    fetchingFreeToWatch,
  } = useSelector(FreeToWatchSelector.getFreeToWatchData);

  const {
    latestTrailers,
    latestTrailersFetchingError,
    latestTrailersPage,
    fetchingLatestTrailers,
  } = useSelector(LatestTrailerSelector.getLatestTrailerData);
  const { trending, trendingPage, fetchingTrending, trendingFetchingError } =
    useSelector(TrendingSelector.getTrendigData);
  const {
    popularMovieFilterData,
    freeToWatchMovieFilterData,
    trailerFilterData,
    trendingFilterData,
  } = filterData;

  return (
    <View style={styles.container}>
      {/* <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
        searchModal={searchModal}
        setSearchModal={setSearchModal}
        onPress={() => navigation.openDrawer()}
      /> */}
      {/* {searchModal && (
        <SearchModal
          searchQuery={searchQuery}
          searchModal={searchModal}
          setSearchQuery={setSearchQuery}
          setSearchModal={setSearchModal}
        />
      )} */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ListContainer
          title={strings.whatsPopular}
          filterOptions={popularMovieFilterData}
          data={whatsPopularData ?? []}
          fetchingState={fetchingWhatsPopularData}
          errorState={whatsPopularDataFetchingError}
          listPage={whatsPopularPage}
          searchModal={true}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={freeToWatchMovieFilterData}
          data={freeToWatch ?? []}
          fetchingState={fetchingFreeToWatch}
          errorState={freeToWatchFetchingError}
          listPage={freeToWatchPage}
          searchModal={true}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={trailerFilterData}
          data={latestTrailers ?? []}
          fetchingState={fetchingLatestTrailers}
          errorState={latestTrailersFetchingError}
          listPage={latestTrailersPage}
          searchModal={true}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={trendingFilterData}
          data={trending ?? []}
          fetchingState={false}
          errorState={false}
          listPage={trendingPage}
          searchModal={true}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
