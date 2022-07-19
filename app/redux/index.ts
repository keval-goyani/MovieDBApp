import { combineReducers } from 'redux';
import { authReducer } from './AuthRedux';
import { chatReducer } from './ChatRedux';
import { userListReducer } from './ChatUserListRedux';
import { wallpaperReducer } from './ChatWallpaperRedux';
import { selectTabReducer } from './DrawerSelectRedux';
import { freeMovieReducer } from './FreeMovieRedux';
import { detailReducer } from './MovieDetailRedux';
import { popularReducer } from './PopularRedux';
import { trailerReducer } from './TrailerRedux';
import { trendingReducer } from './TrendingRedux';
import { usersListReducer } from './UserListRedux';

export default combineReducers({
  authData: authReducer,
  chatData: chatReducer,
  chatUser: userListReducer,
  freeMovieData: freeMovieReducer,
  movieDetailData: detailReducer,
  popularData: popularReducer,
  trailerData: trailerReducer,
  trendingData: trendingReducer,
  selectTab: selectTabReducer,
  chatWallpaper: wallpaperReducer,
  user: usersListReducer,
});
