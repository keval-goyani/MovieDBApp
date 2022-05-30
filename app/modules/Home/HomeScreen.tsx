import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  ListContainer,
  MovieTrailer,
  SearchModal,
} from '../../components';
import { filterData, NavigationDataType, strings } from '../../constants';
import { freeMovieSelectors } from '../../redux/FreeMovieRedux';
import popularAction, { popularDataSelectors } from '../../redux/PopularRedux';
import { trailerDataSelectors } from '../../redux/TrailerRedux';
import { trendingSelectors } from '../../redux/TrendingRedux';
import { Icons } from '../../theme';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const navigation: NavigationDataType = useNavigation();
  const {
    whatsPopularSearch,
    whatsPopularData,
    whatsPopularDataFetchingError,
    whatsPopularPage,
    fetchingWhatsPopularData,
  } = useSelector(popularDataSelectors.getData);
  const {
    freeToWatchSearch,
    freeToWatch,
    freeToWatchFetchingError,
    freeToWatchPage,
    fetchingFreeToWatch,
  } = useSelector(freeMovieSelectors.getData);
  const {
    latestTrailersSearch,
    latestTrailers,
    latestTrailersFetchingError,
    latestTrailersPage,
    fetchingLatestTrailers,
  } = useSelector(trailerDataSelectors.getData);
  const {
    trendingSearch,
    trending,
    trendingPage,
    fetchingTrending,
    trendingFetchingError,
  } = useSelector(trendingSelectors.getData);
  const {
    popularMovieFilterData,
    freeToWatchMovieFilterData,
    trailerFilterData,
    trendingFilterData,
  } = filterData;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModal, setSearchModal] = useState(false);
  const [popularData, setPopularData] = useState(whatsPopularData);
  const [freeData, setFreeData] = useState(freeToWatch);
  const [trailersData, setTrailersData] = useState(latestTrailers);
  const [trendingData, setTrendingData] = useState(trending);

  const searchData = useCallback(() => {
    dispatch(popularAction.searchRequest(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    searchData();
  }, [searchData]);

  const getSearchResult = useCallback(() => {
    if (searchQuery !== '') {
      setPopularData(whatsPopularSearch);
      setFreeData(freeToWatchSearch);
      setTrailersData(latestTrailersSearch);
      setTrendingData(trendingSearch);
    } else {
      setPopularData(whatsPopularData);
      setFreeData(freeToWatch);
      setTrailersData(latestTrailers);
      setTrendingData(trending);
    }
  }, [
    freeToWatch,
    freeToWatchSearch,
    latestTrailers,
    latestTrailersSearch,
    searchQuery,
    trending,
    trendingSearch,
    whatsPopularData,
    whatsPopularSearch,
  ]);

  useEffect(() => {
    getSearchResult();
  }, [getSearchResult]);

  useEffect(() => {
    !searchModal && setSearchQuery('');
  }, [searchModal]);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
        searchModal={searchModal}
        setSearchModal={setSearchModal}
        onPress={() => navigation.openDrawer()}
      />
      {searchModal && (
        <SearchModal
          searchQuery={searchQuery}
          searchModal={searchModal}
          setSearchQuery={setSearchQuery}
          setSearchModal={setSearchModal}
        />
      )}
      <ScrollView bounces={false}>
        <ListContainer
          title={strings.whatsPopular}
          filterOptions={popularMovieFilterData}
          data={popularData ?? []}
          fetchingState={fetchingWhatsPopularData}
          errorState={whatsPopularDataFetchingError}
          listPage={whatsPopularPage}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={freeToWatchMovieFilterData}
          data={freeData ?? []}
          fetchingState={fetchingFreeToWatch}
          errorState={freeToWatchFetchingError}
          listPage={freeToWatchPage}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={trailerFilterData}
          data={trailersData ?? []}
          fetchingState={fetchingLatestTrailers}
          errorState={latestTrailersFetchingError}
          listPage={latestTrailersPage}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={trendingFilterData}
          data={trendingData ?? []}
          fetchingState={fetchingTrending}
          errorState={trendingFetchingError}
          listPage={trendingPage}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
