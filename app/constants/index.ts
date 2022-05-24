import appConstants from './appConstants';
import {
  DataType,
  DetailPathDataType,
  DetailResponseGenerator,
  DetailStateDataType,
  DetailStoreDataType,
  DropDownDataType,
  FormTypeProps,
  FreeMovieDataType,
  HeaderDataType,
  ListContainerDataType,
  ListItemDataType,
  ListItemType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  MovieSagaDataType,
  MovieStoreDataType,
  NavigationDataType,
  PopularDataType,
  RootState,
  RouteDataType,
  TrailerDataType,
  TrendingDataType,
} from './appTypes';
import navigationStrings from './navigationStrings';
import { filterData, movieDetails } from './staticData';
import strings from './strings';

export { appConstants, navigationStrings, filterData, movieDetails, strings };
export type {
  DataType,
  DetailPathDataType,
  DetailResponseGenerator,
  DetailStateDataType,
  DetailStoreDataType,
  DropDownDataType,
  FreeMovieDataType,
  HeaderDataType,
  ListContainerDataType,
  ListItemDataType,
  ListItemType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  MovieSagaDataType,
  MovieStoreDataType,
  NavigationDataType,
  PopularDataType,
  RootState,
  RouteDataType,
  TrailerDataType,
  TrendingDataType,
  FormTypeProps,
};
