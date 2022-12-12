export type MovieListItemDataType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type FreeToWatchDataType = {
  freeToWatch: Array<MovieListItemDataType>;
  fetchingFreeToWatch: boolean;
  freeToWatchFetchingError: string | unknown;
  freeToWatchPage: number;
};

const INITIAL_STATE_OF_FREE_TO_WATCH: FreeToWatchDataType = {
  freeToWatch: [],
  fetchingFreeToWatch: false,
  freeToWatchFetchingError: '',
  freeToWatchPage: 0,
};

export default INITIAL_STATE_OF_FREE_TO_WATCH;
