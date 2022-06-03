import { strings } from '../constants';
import appConstants from './appConstants';

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

export const usersList = [
  { id: 0, email: 'user1@gmail.com', day: 'today' },
  { id: 1, email: 'user2@gmail.com', day: 'today' },
  { id: 3, email: 'user3@gmail.com', day: 'yesterday' },
  { id: 4, email: 'user4@gmail.com', day: 'yesterday' },
  { id: 5, email: 'user5@gmail.com', day: 'yesterday' },
  { id: 6, email: 'user6@gmail.com', day: '31-05-2022' },
  { id: 7, email: 'user7@gmail.com', day: '25-05-2022' },
  { id: 8, email: 'user8@gmail.com', day: '25-05-2022' },
  { id: 9, email: 'user9@gmail.com', day: '15-05-2022' },
  { id: 10, email: 'user10@gmail.com', day: '01-05-2022' },
];

export const messagesData = [
  { user: 0, time: '12:09', content: 'Things are going great!' },
  { user: 1, time: '12:07', content: 'How is it going?' },
  { user: 1, time: '12:05', content: "What's Up?" },
  { user: 0, time: '12:00', content: 'Hey!' },
];
