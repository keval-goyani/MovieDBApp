import { combineReducers } from 'redux';
import { detailReducer } from './MovieDetailRedux';
import { movieReducer } from './movieRedux';

export default combineReducers({
  movieData: movieReducer,
  movieDetailData: detailReducer,
});
