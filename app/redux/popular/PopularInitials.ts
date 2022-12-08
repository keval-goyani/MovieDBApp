export type PopularListItemDataType = {
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

export type WhatsPopularDataType = {
  whatsPopularData: Array<PopularListItemDataType>;
  fetchingWhatsPopularData: boolean;
  whatsPopularDataFetchingError: string | unknown;
  whatsPopularPage: number;
};

const INITIAL_STATE = {
  whatsPopularData: [],
  fetchingWhatsPopularData: false,
  whatsPopularDataFetchingError: '',
  whatsPopularPage: 0,
};

export default INITIAL_STATE;
