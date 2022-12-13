import { type RootStateType } from '../store';
import { type WhatsPopularDataType } from './PopularInitials';

const getWhatsPopularData = (state: RootStateType): WhatsPopularDataType => {
  return state?.whatsPopular;
};

type WhatsPopularSelectorType = {
  getWhatsPopularData: (state: RootStateType) => WhatsPopularDataType;
};

export const WhatsPopularSelector: WhatsPopularSelectorType = {
  getWhatsPopularData,
};
