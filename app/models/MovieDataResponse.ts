import {
  type MovieListItemDataType,
  type PopularListItemDataType,
} from '../redux';

export type ResponseType = {
  data: Array<PopularListItemDataType>;
  pageNo: number;
};

export type FreeToWatchResponseType = {
  data: Array<MovieListItemDataType>;
  pageNo: number;
};

export type MovieListDataType = {
  page: number;
  results: Array<MovieListItemDataType>;
  total_pages: number;
  total_results: number;
};
