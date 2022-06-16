import { PERMISSIONS } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import { Metrics } from '../theme';

export default {
  posterImageUrl: 'https://image.tmdb.org/t/p/w342',
  backDropImageUrl: 'https://image.tmdb.org/t/p/w780',
  movieTrailerBackgroundImage:
    'https://image.tmdb.org/t/p/w780/ic8h5oYQWwqQWPyfpZUSomZTdao.jpg',
  baseUrl: 'https://api.themoviedb.org/3',
  popularMoviePath: '/movie/popular',
  freeToWatchMoviePath: '/discover/movie',
  trendingMoviePath: '/trending/all/day',
  apiKey: '?api_key=1b798ccdd4a124b7939797f1601930cc',
  language: 'en-US',
  page: '&page=',
  popularStreamingMoviePath: '/movie/popular',
  popularTvMoviePath: '/tv/popular',
  discoverMoviePath: '/discover/movie',
  discoverTvPath: '/discover/tv',
  popularTheaterMoviePath: 'movie/now_playing',
  latestTrailerPath: '/movie/upcoming',
  trendingDayMoviePath: '/trending/all/day',
  trendingWeekMoviePath: '/trending/all/week',
  defaultPage: 1,
  watchFreeMovie: '&sort_by=revenue.desc&with_watch_monetization_types=free',
  watchFreeTv: '&sort_by=popularity.desc&with_watch_monetization_types=free',
  watchRent: '&sort_by=popularity.desc&with_watch_monetization_types=rent',
  trailerWatchRent:
    '&sort_by=popularity.desc&with_watch_monetization_types=rent',
  trailerOnTv: '&sort_by=first_air_date.desc',
  moviePath: '/movie/',
  tvPath: '/tv/',
  appendResponseOfCredit: '&append_to_response=credits',
  androidFolder: `${RNFetchBlob.fs.dirs.DCIMDir}/MovieDB`,
  iosFolder: `${RNFetchBlob.fs.dirs.DocumentDir}/MovieDB`,
  timestamp: new Date().getTime(),
  cameraPermission: Metrics.isAndroid
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA,
  galleryPermission: Metrics.isAndroid
    ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
};
