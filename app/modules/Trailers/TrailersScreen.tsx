import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, Trailers } from '../../components';
import { NavigationDataType } from '../../constants';
import { trailerDataSelectors } from '../../redux/TrailerRedux';
import { Icons } from '../../theme';
import styles from './styles/TrailerScreenStyles';

const TrailersScreen = () => {
  const { latestTrailers, latestTrailersPage } = useSelector(
    trailerDataSelectors.getData,
  );
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        onPress={() => navigation.openDrawer()}
      />
      <Trailers
        data={latestTrailers ?? []}
        listPage={latestTrailersPage ?? 0}
      />
    </View>
  );
};

export default TrailersScreen;
