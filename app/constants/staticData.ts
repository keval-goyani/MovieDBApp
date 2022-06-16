import { appConstants, strings } from '../constants';

export const filterData = {
  popularMovieFilterData: [
    {
      id: 0,
      name: strings.streaming,
      endPoint: `${appConstants.popularStreamingMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
    {
      id: 1,
      name: strings.onTv,
      endPoint: `${appConstants.popularTvMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
    {
      id: 2,
      name: strings.forRent,
      endPoint: `${appConstants.discoverMoviePath}${appConstants.apiKey}${appConstants.watchRent}${appConstants.page}`,
    },
    {
      id: 3,
      name: strings.inTheaters,
      endPoint: `${appConstants.popularTheaterMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
  ],
  freeToWatchMovieFilterData: [
    {
      id: 0,
      name: strings.movies,
      endPoint: `${appConstants.discoverMoviePath}${appConstants.apiKey}${appConstants.watchFreeMovie}${appConstants.page}`,
    },
    {
      id: 1,
      name: strings.tv,
      endPoint: `${appConstants.discoverTvPath}${appConstants.apiKey}${appConstants.watchFreeTv}${appConstants.page}`,
    },
  ],
  trailerFilterData: [
    {
      id: 0,
      name: strings.streaming,
      endPoint: `${appConstants.latestTrailerPath}${appConstants.apiKey}${appConstants.page}`,
    },
    {
      id: 1,
      name: strings.onTv,
      endPoint: `${appConstants.discoverTvPath}${appConstants.apiKey}${appConstants.page}`,
    },
    {
      id: 2,
      name: strings.forRent,
      endPoint: `${appConstants.discoverMoviePath}${appConstants.apiKey}${appConstants.trailerWatchRent}${appConstants.page}`,
    },
    {
      id: 3,
      name: strings.inTheaters,
      endPoint: `${appConstants.popularTheaterMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
  ],
  trendingFilterData: [
    {
      id: 0,
      name: strings.today,
      endPoint: `${appConstants.trendingDayMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
    {
      id: 1,
      name: strings.thisWeek,
      endPoint: `${appConstants.trendingWeekMoviePath}${appConstants.apiKey}${appConstants.page}`,
    },
  ],
};

export const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const pickerOptions = {
  maxWidth: 800,
  maxHeight: 800,
  includeBase64: true,
  includeExtra: true,
};
