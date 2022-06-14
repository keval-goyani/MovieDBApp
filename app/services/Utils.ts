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

export const getUniqueMovies = (movies: ListItemDataType[]) => {
  const uniqueMovies = [
    ...new Map(movies.map(item => [item.id, item])).values(),
  ];

  return uniqueMovies;
};

const padTo2Digits = (input: number) => {
  return input.toString().padStart(2, '0');
};

export const timestampToTime = (timestamp: number) => {
  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  return hours >= 12
    ? `${padTo2Digits(hours - 12)}:${padTo2Digits(minutes)} pm`
    : `${padTo2Digits(hours)}:${padTo2Digits(minutes)} am`;
};

export const getChatTime = (time: number) => {
  const latestChatTime = new Date(time).getDate();
  const currentTime = new Date().getDate();
  const timeDifference = currentTime - latestChatTime;

  if (time !== 0) {
    switch (timeDifference) {
      case 0:
        return timestampToTime(time);
      case 1:
        return strings.yesterday;
      default:
        return new Date(time).toLocaleDateString('en-GB').toString();
    }
  }
  return strings.emptyString;
};

export const sortString = (input: string) => {
  return input.split('').sort().join('');
};
