import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { Loader } from '../components';
import { MovieDataType, NavigationDataType } from '../constants';
import popularAction from '../redux/PopularRedux';
import { Color } from '../theme';
import { listItem } from './ListContainer';
import styles from './styles/MoviesStyles';

const Movies: FC<MovieDataType> = ({ data }) => {
  const movieListData = [...data];
  const navigation: NavigationDataType = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={[
          Color.pistachioDark,
          Color.pistachioMoreDark,
          Color.etonBlue,
          Color.skyBlue,
          Color.blue,
        ]}>
        <FlatList
          contentContainerStyle={styles.listStyle}
          numColumns={2}
          data={movieListData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={item => listItem(item, navigation)}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onEndReachedThreshold={4}
          onEndReached={() => dispatch(popularAction.moviesPaginationRequest())}
          ListFooterComponent={<Loader size="small" color={Color.white} />}
          ListFooterComponentStyle={styles.footerLoaderStyle}
        />
      </LinearGradient>
    </View>
  );
};

export default Movies;
