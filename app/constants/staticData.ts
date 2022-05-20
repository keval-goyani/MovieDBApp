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

export const movieDetails = {
  adult: false,
  backdrop_path: '/7KL4yJ4JsbtS1BNRilUApLvMnc5.jpg',
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 27,
      name: 'Horror',
    },
  ],
  homepage: 'https://www.netflix.com/title/81028990',
  id: 649087,
  imdb_id: 'tt11307814',
  original_language: 'sv',
  original_title: 'Red Dot',
  overview:
    'On a hiking trip to rekindle their marriage, a couple find themselves fleeing for their lives in the unforgiving wilderness from an unknown shooter.',
  popularity: 48.244,
  poster_path: '/xZ2KER2gOHbuHP2GJoODuXDSZCb.jpg',
  production_companies: [
    {
      id: 5610,
      logo_path: null,
      name: 'Film i Dalarna',
      origin_country: 'SE',
    },
    {
      id: 6181,
      logo_path: '/eaQ7or8IoEmPfgmQiU2C5lVZkxS.png',
      name: 'SF Studios',
      origin_country: 'SE',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'SE',
      name: 'Sweden',
    },
  ],
  release_date: '2021-02-11',
  revenue: 0,
  runtime: 86,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
    {
      english_name: 'Swedish',
      iso_639_1: 'sv',
      name: 'svenska',
    },
  ],
  status: 'Released',
  tagline: '',
  title: 'Red Dot',
  video: false,
  vote_average: 5.9,
  vote_count: 592,
  credits: {
    cast: [
      {
        adult: false,
        gender: 2,
        id: 116614,
        known_for_department: 'Acting',
        name: 'Johannes Bah Kuhnke',
        original_name: 'Johannes Bah Kuhnke',
        popularity: 3.273,
        profile_path: '/q9xNsXwP1LBnOR8m251O86Uvl36.jpg',
        cast_id: 4,
        character: 'Einar',
        credit_id: '5fc5055bd2f5b50040d994d4',
        order: 1,
      },
    ],
    crew: [
      {
        adult: false,
        gender: 2,
        id: 1394236,
        known_for_department: 'Directing',
        name: 'Alain Darborg',
        original_name: 'Alain Darborg',
        popularity: 0.852,
        profile_path: '/AplLtXCQ1n7PGIGCPIVIvJJU2vq.jpg',
        credit_id: '606d105612c604002965444f',
        department: 'Directing',
        job: 'Director',
      },
      {
        adult: false,
        gender: 2,
        id: 1394236,
        known_for_department: 'Directing',
        name: 'Alain Darborg',
        original_name: 'Alain Darborg',
        popularity: 0.852,
        profile_path: '/AplLtXCQ1n7PGIGCPIVIvJJU2vq.jpg',
        credit_id: '60962c7bb34409003db7986b',
        department: 'Writing',
        job: 'Writer',
      },
      {
        adult: false,
        gender: 0,
        id: 1394242,
        known_for_department: 'Camera',
        name: 'Benjam Orre',
        original_name: 'Benjam Orre',
        popularity: 0.6,
        profile_path: null,
        credit_id: '602591d39d2b63003f6781f3',
        department: 'Camera',
        job: 'Director of Photography',
      },
    ],
  },
};
