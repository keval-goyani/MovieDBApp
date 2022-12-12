import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import { APIConst, ToolkitAction } from '../../constants';
import {
  type ErrorResponse,
  type FreeToWatchResponseType,
  type MovieListDataType,
} from '../../models';
import {
  INITIAL_STATE_OF_FREE_TO_WATCH,
  type FreeToWatchDataType,
  type MovieListItemDataType,
} from '../freeToWatch';
import { type RootStateType } from '../store';
import { type ParamsType } from '../Types';

const freeToWatchData = createAsyncThunk<
  FreeToWatchResponseType,
  ParamsType,
  { state: RootStateType; rejectValue: ErrorResponse }
>(ToolkitAction.freeToWatch, async (params, { getState, rejectWithValue }) => {
  const { urlMainPath, pageNo }: ParamsType = params;
  const previousFreeToWatchData: MovieListItemDataType[] =
    getState().freeToWatch.freeToWatch;

  try {
    const response: AxiosResponse<MovieListDataType, any> = await axios.get(
      `${APIConst.baseUrl}${urlMainPath}${pageNo}`,
    );

    return {
      data:
        pageNo !== 1
          ? [...previousFreeToWatchData, ...response?.data?.results]
          : response?.data?.results,
      pageNo: response?.data?.page,
    };
  } catch ({ message }: ErrorResponse | unknown) {
    return rejectWithValue({ message: message });
  }
});

const freeToWatchSlice = createSlice({
  name: 'freeToWatch',
  initialState: INITIAL_STATE_OF_FREE_TO_WATCH,
  extraReducers: builder => {
    builder.addCase(freeToWatchData.pending, (state: FreeToWatchDataType) => {
      state.fetchingFreeToWatch = true;
    });
    builder.addCase(
      freeToWatchData.fulfilled,
      (
        state: FreeToWatchDataType,
        action: PayloadAction<FreeToWatchResponseType>,
      ) => {
        state.fetchingFreeToWatch = false;
        state.freeToWatch = action?.payload?.data;
        state.freeToWatchPage = action?.payload?.pageNo;
      },
    );
    builder.addCase(
      freeToWatchData.rejected,
      (
        state: FreeToWatchDataType,
        action: PayloadAction<ErrorResponse | unknown>,
      ) => {
        state.fetchingFreeToWatch = false;
        state.freeToWatchFetchingError = action.payload;
      },
    );
  },
  reducers: {},
});

export const FreeToWatchAction = { freeToWatchData };
export const FreeToWatchReducer = freeToWatchSlice.reducer;
