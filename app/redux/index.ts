import { combineReducers } from 'redux';
import { RootState, strings } from '../constants';
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

export const rootReducer = (
  state: RootState | undefined,
  action: { type: string },
) => {
  if (action?.type === strings.signoutRequest) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const appReducer = combineReducers({
  authData: authReducer,
  chat: chatReducer,
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
