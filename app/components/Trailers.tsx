import React, { FC, useState } from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { Loader, trailerListItem } from '../components';
import { filterData, ListContainerDataType } from '../constants';
import trailerAction from '../redux/TrailerRedux';
import { Color } from '../theme';
import styles from './styles/TrailersStyles';

const Trailers: FC<ListContainerDataType> = ({ data, listPage }) => {
  const { trailerFilterData } = filterData;
  const dispatch = useDispatch();
  const [dataEndPoint, setDataEndPoint] = useState<string>(
    trailerFilterData[0].endPoint,
  );
  const movieListData = [...data];

  const pageLoading = () => {
    setDataEndPoint(dataEndPoint);
    dispatch(
      trailerAction.latestTrailerDataRequest({
        urlMainPath: dataEndPoint,
        pageNo: listPage + 1,
      }),
    );
  };

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
          contentContainerStyle={styles.listItem}
          data={movieListData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={trailerListItem}
          bounces={false}
          onEndReachedThreshold={4}
          onEndReached={() => pageLoading()}
          ListFooterComponent={<Loader size="small" color={Color.white} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={styles.footerLoaderStyle}
        />
      </LinearGradient>
    </View>
  );
};

export default Trailers;
