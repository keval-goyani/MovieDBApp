import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { APIConst } from '../../constants';
import { ErrorResponse } from '../../models';
import { type ParamsType } from '../Types';
import INITIAL_STATE_OF_TRENDING from './TrendingInitials';

const trendingData = createAsyncThunk(
  'trending',
  async (params, { getState, rejectWithValue }) => {
    console.log(params, '<=========params');
    const { urlMainPath, pageNo }: ParamsType = params;
    const previousTrendingData = getState().trending.trending;
    console.log(getState().trending.trending, '<========previousTrendingData');

    try {
      const response: AxiosResponse<any, any> = await axios.get(
        `${APIConst.baseUrl}${urlMainPath}${pageNo}`,
      );
      console.log(pageNo, '<=====pageNo');

      return {
        data:
          pageNo !== 1
            ? [...previousTrendingData, ...response?.data?.results]
            : response?.data?.results,
        pageNo: response?.data?.page,
      };
    } catch ({ message }: ErrorResponse | unknown) {
      return rejectWithValue({ message: message });
    }
  },
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState: INITIAL_STATE_OF_TRENDING,
  extraReducers: builder => {
    builder.addCase(trendingData.pending, state => {
      state.fetchingTrending = true;
    });
    builder.addCase(trendingData.fulfilled, (state, action) => {
      state.fetchingTrending = false;
      state.trending = action?.payload?.data;
      state.trendingPage = action?.payload?.pageNo;
    });
    builder.addCase(trendingData.rejected, (state, action) => {
      state.fetchingTrending = false;
      state.trendingFetchingError = action.payload;
    });
  },
  reducers: {},
});

export const TrendingAction = { trendingData };
export const TrendingReducer = trendingSlice.reducer;
