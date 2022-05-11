import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header, ListContainer, MovieTrailer } from '../../components';
import {
  filterData,
  movieData,
  movieTrailerData,
  strings,
} from '../../constants';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView bounces={false}>
        <ListContainer
          title={strings.whatsPopular}
          filterOptions={filterData.popularMovieTrailerFilterData}
          initialValue={filterData.popularMovieTrailerFilterData[0]}
          data={movieData.results}
        />
        <ListContainer
          title={strings.freeToWatch}
          filterOptions={filterData.freeToWatchMovieFilterData}
          initialValue={filterData.freeToWatchMovieFilterData[0]}
          data={movieData.results}
        />
        <MovieTrailer
          title={strings.latestTrailers}
          filterOptions={filterData.popularMovieTrailerFilterData}
          initialValue={filterData.popularMovieTrailerFilterData[0]}
          data={movieTrailerData.results}
        />
        <ListContainer
          title={strings.trending}
          filterOptions={filterData.trendingFilterData}
          initialValue={filterData.trendingFilterData[0]}
          data={movieData.results}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
