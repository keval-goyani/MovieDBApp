import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, Trailers } from '../../components';
import { trailerDataSelectors } from '../../redux/TrailerRedux';
import { Icons } from '../../theme';
import styles from './styles/TrailerScreenStyles';

const TrailersScreen = () => {
  const { latestTrailers, latestTrailersPage } = useSelector(
    trailerDataSelectors.getData,
  );

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
      />
      <Trailers
        data={latestTrailers ?? []}
        listPage={latestTrailersPage ?? 0}
      />
    </View>
  );
};

export default TrailersScreen;
