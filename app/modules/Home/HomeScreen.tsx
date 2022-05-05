import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ListContainer, MovieTrailer } from '../../components';
import { appConstants, filterData, strings } from '../../constants';
import dataAction, { apiDataSelectors } from '../../redux/movieRedux';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    popularMovieFilterData,
    freeToWatchMovieFilterData,
    trailerFilterData,
    trendingFilterData,
  } = filterData;
  useEffect(() => {
    dispatch(
      dataAction.whatsPopularDataRequest({
        urlMainPath: popularMovieFilterData[0].endPoint,
        pageNo: appConstants.defaultPage,
      }),
    );
    dispatch(
      dataAction.freeToWatchDataRequest({
        urlMainPath: freeToWatchMovieFilterData[0].endPoint,
        pageNo: appConstants.defaultPage,
      }),
    );
    dispatch(
      dataAction.latestTrailerDataRequest({
        urlMainPath: trailerFilterData[0].endPoint,
        pageNo: appConstants.defaultPage,
      }),
    );
    dispatch(
      dataAction.trendingDataRequest({
        urlMainPath: trendingFilterData[0].endPoint,
        pageNo: appConstants.defaultPage,
      }),
    );
  }, [
    dispatch,
    freeToWatchMovieFilterData,
    popularMovieFilterData,
    trailerFilterData,
    trendingFilterData,
  ]);

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
          filterOptions={popularMovieFilterData}
          initialValue={popularMovieFilterData[0]}
          data={whatsPopularData ?? []}
          fetchingState={fetchingWhatsPopularData}
          errorState={whatsPopularDataFetchingError}
          listPage={whatsPopularPage}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={freeToWatchMovieFilterData}
          initialValue={freeToWatchMovieFilterData[0]}
          data={freeToWatch ?? []}
          fetchingState={fetchingFreeToWatch}
          errorState={freeToWatchFetchingError}
          listPage={freeToWatchPage}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={trailerFilterData}
          initialValue={trailerFilterData[0]}
          data={latestTrailers ?? []}
          fetchingState={fetchingLatestTrailers}
          errorState={latestTrailersFetchingError}
          listPage={latestTrailersPage}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={trendingFilterData}
          initialValue={trendingFilterData[0]}
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
