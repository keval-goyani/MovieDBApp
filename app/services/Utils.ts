import apisauce from 'apisauce';
import { Alert } from 'react-native';
import { appConstants, movieDetails, strings } from '../constants';
import { ResponseGenerator } from '../sagas/movieSaga';
import { Color } from '../theme';

export const apiConfig = apisauce.create({
  baseURL: appConstants.baseUrl,
});

export async function getError(response: ResponseGenerator) {
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

export const getDetails = () => {
  const votePercentage = movieDetails?.vote_average * 10;
  const activeStrokeColor =
    movieDetails?.vote_average > 6.9
      ? Color.PercentageDarkGreen
      : Color.percentageDarkYellow;
  const inActiveStrokeColor =
    movieDetails?.vote_average > 6.9
      ? Color.PercentageLightGreen
      : Color.percentageLightYellow;
  const year = new Date(movieDetails?.release_date).toString().slice(11, 15);
  const country = movieDetails?.production_countries?.[0]?.iso_3166_1;
  const movieTitle = movieDetails?.title;
  const hour = Math.floor((movieDetails?.runtime ?? 0) / 60);
  const minutes = (movieDetails?.runtime ?? 0) % 60;
  const runTime =
    minutes === 0
      ? hour === 0
        ? `${minutes}m`
        : `${hour}h`
      : `${hour}h ${minutes}m`;
  const movieType = movieDetails?.genres?.map(item => item.name).join(', ');
  const directorName = movieDetails?.credits?.crew
    .filter(item => item.job === strings.director)
    .map(item => item.name)
    .join();

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
