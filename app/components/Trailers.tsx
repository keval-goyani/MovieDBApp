import React, { FC, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { filterData, ListContainerDataType } from '../constants';
import trailerAction from '../redux/TrailerRedux';
import { listItem } from './MovieTrailers';
import styles from './styles/TrailersStyle';

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
      <FlatList
        data={movieListData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={listItem}
        bounces={false}
        onEndReachedThreshold={4}
        onEndReached={() => pageLoading()}
        ListFooterComponent={ActivityIndicator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Trailers;
