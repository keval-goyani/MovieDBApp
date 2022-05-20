import rootReducer from '../redux';

interface genresDataType {
  id: number;
  name: string;
}

interface ProductionCompaniesDataType {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountriesDataType {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguagesDataType {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface CreditsDataType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export interface MovieDetailsDataType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genresDataType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesDataType[];
  production_countries: ProductionCountriesDataType[];
  release_date: string;
  first_air_date: string;
  revenue: number;
  runtime: number;
  episode_run_time: number[];
  spoken_languages: SpokenLanguagesDataType[];
  status: string;
  tagline: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CreditsDataType[];
    crew: CreditsDataType[];
  };
}

export type RootState = ReturnType<typeof rootReducer>;

export interface MovieSagaDataType {
  path: {
    urlMainPath?: string;
    pageNo: number;
  };
  type: string;
}

export interface DetailPathDataType {
  payload: string;
  type: string;
}

export interface DetailResponseGenerator {
  config?: object;
  data: MovieDetailsDataType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

export interface DetailStateDataType {
  detailData: MovieDetailsDataType | null;
  fetchingDetailData: boolean;
  DetailDataFetchingError: boolean;
}

export interface DetailStoreDataType {
  data: MovieDetailsDataType;
  error: string;
}

export interface ListItemDataType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
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
}

export interface ListItemType {
  page: number;
  results: Array<ListItemDataType>;
  total_pages: number;
  total_results: number;
}

export interface MovieResponseGenerator {
  config?: object;
  data: ListItemType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

export interface RouteDataType {
  route: {
    params: { id: number; data: string };
  };
}
