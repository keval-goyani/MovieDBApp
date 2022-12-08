import { type RootStateType } from '../';
import { type WhatsPopularDataType } from './';

const getWhatsPopularData = (state: RootStateType): WhatsPopularDataType => {
  return state?.whatsPopular;
};

type WhatsPopularSelectorType = {
  getWhatsPopularData: (state: RootStateType) => WhatsPopularDataType;
};

export const WhatsPopularSelector: WhatsPopularSelectorType = {
  getWhatsPopularData,
};
