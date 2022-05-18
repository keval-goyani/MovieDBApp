import { combineReducers } from 'redux';
import { movieReducer } from './movieRedux';

export default combineReducers({
  movieData: movieReducer,
});
