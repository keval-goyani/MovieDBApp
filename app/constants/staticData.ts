import strings from './strings';
import appConstants from './appConstants';

const filterData = {
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

const genres = [
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

const pickerOptions = {
  maxWidth: 800,
  maxHeight: 800,
  includeBase64: true,
  includeExtra: true,
};

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const imageList = [
  {
    id: 1,
    image:
      'https://firebasestorage.googleapis.com:443/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1660035707009_8C0C6E38-9675-4D95-AE1C-8FCFE9C6A88C.jpg?alt=media&token=f5db3ee1-40b3-47de-b070-25be67f36ccc',
  },
  {
    id: 2,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659940616317_rn_image_picker_lib_temp_3b245d70-e35b-4a61-956e-01783d96c325.jpg?alt=media&token=11e99a67-77c7-4c56-81b8-47baba2ba15b',
  },
  {
    id: 3,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659520895440_rn_image_picker_lib_temp_a2cbbf60-2ded-46cf-9597-148b984d0a79.jpg?alt=media&token=00f95643-eb11-4355-873e-d35959488779',
  },
  {
    id: 4,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659072974284_rn_image_picker_lib_temp_0ef17d75-7764-4440-be85-10bdd82d8617.jpg?alt=media&token=5eb05538-3b30-48fc-aba2-5d4e85299505',
  },
  {
    id: 5,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659072974284_rn_image_picker_lib_temp_0ef17d75-7764-4440-be85-10bdd82d8617.jpg?alt=media&token=5eb05538-3b30-48fc-aba2-5d4e85299505',
  },
  {
    id: 6,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659072974284_rn_image_picker_lib_temp_0ef17d75-7764-4440-be85-10bdd82d8617.jpg?alt=media&token=5eb05538-3b30-48fc-aba2-5d4e85299505',
  },
  {
    id: 7,
    image:
      'https://firebasestorage.googleapis.com/v0/b/moviedb-2908d.appspot.com/o/Profiles%2F1659940616317_rn_image_picker_lib_temp_3b245d70-e35b-4a61-956e-01783d96c325.jpg?alt=media&token=11e99a67-77c7-4c56-81b8-47baba2ba15b',
  },
];

export { filterData, defaultValues, genres, pickerOptions, imageList };
