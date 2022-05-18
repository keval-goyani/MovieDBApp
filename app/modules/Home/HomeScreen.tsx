import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ListContainer, MovieTrailer } from '../../components';
import { filterData, strings } from '../../constants';
import dataAction, { apiDataSelectors } from '../../redux/movieRedux';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataAction.whatsPopularDataRequest(1));
    dispatch(dataAction.freeToWatchDataRequest(1));
    dispatch(dataAction.latestTrailerDataRequest(1));
    dispatch(dataAction.trendingDataRequest(1));
  }, [dispatch]);

  const {
    whatsPopularData,
    freeToWatch,
    latestTrailers,
    trending,
    whatsPopularPage,
    freeToWatchPage,
    latestTrailersPage,
    trendingPage,
    fetchingWhatsPopularData,
    fetchingFreeToWatch,
    fetchingLatestTrailers,
    fetchingTrending,
    whatsPopularDataFetchingError,
    freeToWatchFetchingError,
    latestTrailersFetchingError,
    trendingFetchingError,
  } = useSelector(apiDataSelectors.getData);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView bounces={false}>
        <ListContainer
          title={strings.whatsPopular}
          filterOptions={filterData.popularMovieTrailerFilterData}
          initialValue={filterData.popularMovieTrailerFilterData[0]}
          data={whatsPopularData ?? []}
          fetchingState={fetchingWhatsPopularData}
          errorState={whatsPopularDataFetchingError}
          listPage={whatsPopularPage}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={filterData.freeToWatchMovieFilterData}
          initialValue={filterData.freeToWatchMovieFilterData[0]}
          data={freeToWatch ?? []}
          fetchingState={fetchingFreeToWatch}
          errorState={freeToWatchFetchingError}
          listPage={freeToWatchPage}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={filterData.popularMovieTrailerFilterData}
          initialValue={filterData.popularMovieTrailerFilterData[0]}
          data={latestTrailers ?? []}
          fetchingState={fetchingLatestTrailers}
          errorState={latestTrailersFetchingError}
          listPage={latestTrailersPage}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={filterData.trendingFilterData}
          initialValue={filterData.trendingFilterData[0]}
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
