import { type PopularListItemDataType } from '../redux';

export type ResponseType = {
  data: Array<PopularListItemDataType>;
  pageNo: number;
};
