import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import { APIConst, ToolkitAction } from '../../constants';
import { type ErrorResponse } from '../../models';
import INITIAL_STATE_OF_DETAIL, {
  type DetailDataType,
  type DetailsDataResponseType,
} from './DetailInitials';

const detailData = createAsyncThunk<
  DetailsDataResponseType,
  string,
  { rejectValue: ErrorResponse }
>(ToolkitAction.details, async (url, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<DetailsDataResponseType, any> =
      await axios.get(`${APIConst.baseUrl}${url}`);
    return response.data;
  } catch ({ message }: ErrorResponse | unknown) {
    return rejectWithValue({ message: message });
  }
});

const detailSlice = createSlice({
  name: 'detail',
  initialState: INITIAL_STATE_OF_DETAIL,
  extraReducers: builder => {
    builder.addCase(detailData.pending, (state: DetailDataType) => {
      state.fetchingDetailData = true;
    });
    builder.addCase(
      detailData.fulfilled,
      (
        state: DetailDataType,
        action: PayloadAction<DetailsDataResponseType>,
      ) => {
        state.fetchingDetailData = false;
        state.detailData = action.payload;
      },
    );
    builder.addCase(
      detailData.rejected,
      (
        state: DetailDataType,
        action: PayloadAction<ErrorResponse | unknown>,
      ) => {
        state.fetchingDetailData = false;
        state.DetailDataFetchingError = action.payload;
      },
    );
  },
  reducers: {},
});

export const DetailAction = { detailData };
export const DetailReducer = detailSlice.reducer;
