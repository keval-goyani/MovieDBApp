import apisauce from 'apisauce';
import { Alert } from 'react-native';
import { ImmutableObject } from 'seamless-immutable';
import {
  appConstants,
  DetailResponseGenerator,
  genres,
  ListItemDataType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  strings,
} from '../constants';
import { Color } from '../theme';

export const apiConfig = apisauce.create({
  baseURL: appConstants.baseUrl,
});

export async function getError(
  response: MovieResponseGenerator | DetailResponseGenerator,
) {
  if (response.problem === strings.clientError) {
    return strings.pageErrorMessage;
  }
  if (response?.problem === strings.networkError) {
    return strings.networkErrorMessage;
  }
  if (
    [strings.connectionError, strings.serverError].includes(response?.problem)
  ) {
    return strings.serverErrorMessage;
  }
  return strings.errorMessage;
}

export const alertMessage = (error: string) => {
  Alert.alert(error);
};

export const getDetails = (
  movieDetails: ImmutableObject<MovieDetailsDataType> | null,
) => {
  const time = movieDetails?.runtime ?? movieDetails?.episode_run_time[0] ?? 0;
  const votePercentage = (movieDetails?.vote_average ?? 0) * 10;
  const activeStrokeColor =
    votePercentage > 69
      ? Color.PercentageDarkGreen
      : Color.percentageDarkYellow;
  const inActiveStrokeColor =
    votePercentage > 69
      ? Color.PercentageLightGreen
      : Color.percentageLightYellow;
  const year = new Date(
    movieDetails?.release_date ?? movieDetails?.first_air_date ?? '',
  )
    .toString()
    .slice(11, 15);
  const country =
    movieDetails?.production_countries.length === 0
      ? ''
      : `(${movieDetails?.production_countries?.[0]?.iso_3166_1})`;
  const movieTitle = movieDetails?.title ?? movieDetails?.name;
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  const runTime =
    minutes === 0
      ? `${hour}h`
      : hour === 0
      ? `${minutes}m`
      : `${hour}h ${minutes}m`;
  const movieType = movieDetails?.genres?.map(item => item.name).join(', ');
  const directorName = movieDetails?.credits?.crew
    .filter(item => item.job === strings.director)
    .map(item => item.name)
    .join(', ');

  return {
    votePercentage,
    activeStrokeColor,
    inActiveStrokeColor,
    year,
    country,
    movieTitle,
    runTime,
    movieType,
    directorName,
  };
};

const getGenreID = (query: string) => {
  return genres.filter(
    genre => genre?.name.toLowerCase() === query.toLowerCase(),
  )[0]?.id;
};

const searchConditionCheck = (item: string, query: string) => {
  return item?.toLowerCase().includes(query.toLowerCase());
};

export const searchMovie = (movieList: ListItemDataType[], query: string) => {
  const genreId = getGenreID(query);

  return movieList.filter(
    ({
      title,
      original_name,
      original_title,
      name = '',
      overview,
      genre_ids,
    }) =>
      searchConditionCheck(title, query) ||
      searchConditionCheck(original_title, query) ||
      searchConditionCheck(original_name, query) ||
      searchConditionCheck(name, query) ||
      searchConditionCheck(overview, query) ||
      genre_ids?.includes(genreId),
  );
};
