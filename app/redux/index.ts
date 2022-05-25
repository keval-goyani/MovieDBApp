import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';
import { freeMovieReducer } from './FreeMovieRedux';
import { detailReducer } from './MovieDetailRedux';
import { popularReducer } from './PopularRedux';
import { trailerReducer } from './TrailerRedux';
import { trendingReducer } from './TrendingRedux';

export default combineReducers({
  movieDetailData: detailReducer,
  popularData: popularReducer,
  freeMovieData: freeMovieReducer,
  trailerData: trailerReducer,
  trendingData: trendingReducer,
  authData: authReducer,
});
