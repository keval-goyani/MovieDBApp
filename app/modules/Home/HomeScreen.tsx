import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icons } from '../../assets';
import { Header, ListContainer } from '../../components';
import { filterData, strings } from '../../constants';
import { WhatsPopularSelector } from '../../redux';
import styles from './styles/HomeScreenStyles';

const HomeScreen = () => {
  const {
    whatsPopularData,
    fetchingWhatsPopularData,
    whatsPopularDataFetchingError,
    whatsPopularPage,
  } = useSelector(WhatsPopularSelector.getWhatsPopularData);

  const { popularMovieFilterData } = filterData;

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        rightIcon={Icons.searchIcon}
      />
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
