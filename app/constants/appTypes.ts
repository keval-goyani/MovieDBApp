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
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesDataType[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CreditsDataType[];
    crew: CreditsDataType[];
  };
}
