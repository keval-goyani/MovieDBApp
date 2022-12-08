import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIConst } from '../../constants';
import INITIAL_STATE_OF_LATEST from './LatestTrailerInitials';

const latestTrailerData = createAsyncThunk(
  'latestTrailer',
  async (params, { getState }) => {
    //console.log(getState().latestTrailer.latesttrailer, '<==========getState');
    const previousLatestTrailerData = getState().latestTrailer.latestTrailers;
    //console.log(previousLatestTrailerData, '<======previousLatestTrailerData');
    const { urlMainPath, pageNo } = params;
    try {
      const response = await axios.get(
        `${APIConst.baseUrl}${urlMainPath}${pageNo}`,
      );
      return {
        data:
          pageNo !== 1
            ? [...previousLatestTrailerData, ...response?.data?.results]
            : response?.data?.results,
        pageNo: response?.data?.page,
      };
    } catch {
      error => {
        //console.log(error, '<====error');
      };
    }
  },
);

const latestTrailerSlice = createSlice({
  name: 'latestTrailer',
  initialState: INITIAL_STATE_OF_LATEST,
  extraReducers: builder => {
    builder.addCase(latestTrailerData.pending, state => {
      state.fetchingLatestTrailers = true;
    });
    builder.addCase(latestTrailerData.fulfilled, (state, action) => {
      //console.log(action.payload, '<=======action');

      state.fetchingLatestTrailers = false;
      state.latestTrailers = action.payload?.data;
      state.latestTrailersPage = action.payload?.pageNo;
    });
    builder.addCase(latestTrailerData.rejected, (state, action) => {
      state.fetchingLatestTrailers = false;
      state.latestTrailersFetchingError = action.error.message;
    });
  },
  reducers: {},
});

export const LatestTrailerAction = { latestTrailerData };
export const LatestTrailerReducer = latestTrailerSlice.reducer;
