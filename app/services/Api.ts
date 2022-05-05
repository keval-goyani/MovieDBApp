import { apiConfig } from './Utils';

export const getPopularMovieData = (endPoint: string) =>
  apiConfig.get(endPoint);
