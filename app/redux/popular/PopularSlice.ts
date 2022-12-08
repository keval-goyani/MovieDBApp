import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootStateType } from '../';
import { APIConst, ToolkitAction } from '../../constants';
import { type ErrorResponse, type ResponseType } from '../../models';
import {
  INITIAL_STATE,
  PopularListItemDataType,
  type WhatsPopularDataType,
} from './';

type paramTypes = {
  pageNo: number;
  urlMainPath: string;
};

const popularData = createAsyncThunk<
  ResponseType,
  paramTypes,
  { state: RootStateType; rejectValue: ErrorResponse }
>(ToolkitAction.whatsPopular, async (params, { getState, rejectWithValue }) => {
  const { pageNo, urlMainPath }: paramTypes = params;
  const previousPopularData: PopularListItemDataType[] =
    getState().whatsPopular.whatsPopularData;

  try {
    const response = await axios.get(
      `${APIConst.baseUrl}${urlMainPath}${pageNo}`,
    );
    return {
      data:
        pageNo !== 1
          ? [...previousPopularData, ...response?.data?.results]
          : response?.data?.results,
      pageNo: response?.data?.page,
    };
  } catch ({ message }: ErrorResponse | unknown) {
    return rejectWithValue({ message: message });
  }
});

const popularSlice = createSlice({
  name: 'popular',
  initialState: INITIAL_STATE,
  extraReducers: (builder: ActionReducerMapBuilder<WhatsPopularDataType>) => {
    builder.addCase(popularData.pending, (state: WhatsPopularDataType) => {
      state.fetchingWhatsPopularData = true;
    });
    builder.addCase(
      popularData.fulfilled,
      (state: WhatsPopularDataType, action: PayloadAction<ResponseType>) => {
        state.fetchingWhatsPopularData = false;
        state.whatsPopularData = action.payload?.data;
        state.whatsPopularPage = action.payload?.pageNo;
      },
    );
    builder.addCase(
      popularData.rejected,
      (
        state: WhatsPopularDataType,
        action: PayloadAction<ErrorResponse | unknown>,
      ) => {
        state.fetchingWhatsPopularData = false;
        state.whatsPopularData = [];
        state.whatsPopularDataFetchingError = action?.payload;
      },
    );
  },
  reducers: {},
});

export const WhatsPopluarReducer = popularSlice.reducer;
export const WhatsPopluarActions = { popularData };
