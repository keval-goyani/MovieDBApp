import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, Movies } from '../../components';
import { freeMovieSelectors } from '../../redux/FreeMovieRedux';
import { popularDataSelectors } from '../../redux/PopularRedux';
import { trendingSelectors } from '../../redux/TrendingRedux';
import { Icons } from '../../theme';
import styles from './styles/MoviesScreenStyles';

const MoviesScreen = () => {
  const { whatsPopularData, whatsPopularPage } = useSelector(
    popularDataSelectors.getData,
  );
  const { freeToWatch, freeToWatchPage } = useSelector(
    freeMovieSelectors.getData,
  );
  const { trending, trendingPage } = useSelector(trendingSelectors.getData);
  const localData = [...whatsPopularData, ...freeToWatch, ...trending];
  const moviesData = localData.filter(movie => movie?.original_title);
  const paging = { whatsPopularPage, freeToWatchPage, trendingPage };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
      />
      <Movies data={moviesData ?? []} listPage={paging} />
    </View>
  );
};

export default MoviesScreen;
