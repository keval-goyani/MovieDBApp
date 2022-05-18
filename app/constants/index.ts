import { filterData, movieDetails } from './staticData';
import navigationStrings from './navigationStrings';
import strings from './strings';
import appConstants from './appConstants';
import {
  MovieDetailsDataType,
  RootState,
  DetailPathDataType,
  MovieSagaDataType,
  DetailResponseGenerator,
  DetailStoreDataType,
  DetailStateDataType,
  ListItemDataType,
  ListItemType,
  MovieResponseGenerator,
  RouteDataType,
} from './appTypes';

export { appConstants, navigationStrings, filterData, movieDetails, strings };

export type {
  MovieDetailsDataType,
  RootState,
  DetailPathDataType,
  MovieSagaDataType,
  DetailResponseGenerator,
  DetailStoreDataType,
  DetailStateDataType,
  ListItemDataType,
  ListItemType,
  MovieResponseGenerator,
  RouteDataType,
};
