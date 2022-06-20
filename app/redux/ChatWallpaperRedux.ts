import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  DetailPathDataType,
  RootState,
  SetWallpaperDataType,
} from '../constants';

const { Types, Creators } = createActions({
  setWallpaper: ['payload'],
});

export const WallpaperTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableObject<SetWallpaperDataType> = Immutable({
  wallpaperPath: '',
});

export const wallpaperSelectors = {
  getData: (state: RootState) => state?.chatWallpaper,
};

const updateWallpaper = (
  state: ImmutableObject<SetWallpaperDataType>,
  { payload }: DetailPathDataType,
) => {
  return state.merge({
    wallpaperPath: payload,
  });
};

export const wallpaperReducer = createReducer(INITIAL_STATE, {
  [Types.SET_WALLPAPER]: updateWallpaper,
});
