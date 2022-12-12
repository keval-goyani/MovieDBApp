import { type ErrorResponse } from '../../models';

type GenresDataType = {
  id: number;
  name: string;
};
type ProductionCompaniesDataType = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountriesDataType = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguagesDataType = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type CreditsDataType = {
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
};

export type DetailsDataResponseType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: GenresDataType[];
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
};

export type DetailDataType = {
  detailData: DetailsDataResponseType | null;
  fetchingDetailData: boolean;
  DetailDataFetchingError: ErrorResponse | unknown;
};

const INITIAL_STATE_OF_DETAIL: DetailDataType = {
  detailData: null,
  fetchingDetailData: false,
  DetailDataFetchingError: '',
};

export default INITIAL_STATE_OF_DETAIL;
