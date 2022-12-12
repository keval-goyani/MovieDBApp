import { type RootStateType } from '../store';
import { type FreeToWatchDataType } from './FreeToWatchInitials';

const getFreeToWatchData = (state: RootStateType): FreeToWatchDataType => {
  return state?.freeToWatch;
};

type FreeToWatchSelectorType = {
  getFreeToWatchData: (state: RootStateType) => FreeToWatchDataType;
};

export const FreeToWatchSelector: FreeToWatchSelectorType = {
  getFreeToWatchData,
};
