import { type RootStateType } from '../store';
import { type DetailDataType } from './DetailInitials';

const getDetailData = (state: RootStateType): DetailDataType => {
  return state.detail;
};

type DetailSelectorProps = {
  getDetailData: (state: RootStateType) => DetailDataType;
};

const DetailSelector: DetailSelectorProps = {
  getDetailData,
};

export default DetailSelector;
