import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { FlatList } from 'react-native';
import {
  Loader,
  LoadingState,
  movieListItem,
  trailerListItem,
} from '../components';
import { ListDataType, NavigationDataType } from '../constants';

const List: FC<ListDataType> = ({
  fetching,
  listData = [],
  searchModal,
  pageHandler,
  footerStyle,
  listType,
  latestSkeletonStyle,
}) => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <>
      {listData.length === 0 ? (
        <LoadingState
          searchModal={searchModal}
          latestSkeletonStyle={latestSkeletonStyle}
        />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={item =>
            listType ? trailerListItem(item) : movieListItem(item, navigation)
          }
          horizontal
          bounces={false}
          onEndReachedThreshold={1}
          onEndReached={pageHandler}
          ListFooterComponent={<Loader size="small" animating={fetching} />}
          ListFooterComponentStyle={footerStyle}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default List;
