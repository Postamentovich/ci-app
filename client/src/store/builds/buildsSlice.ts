import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildModelArrayHomeworkApiResponse } from 'api/models/models';

type BuildState = {
  list: BuildModelArrayHomeworkApiResponse | [];
  isLoading: boolean;
};

const initialState: BuildState = {
  list: [],
  isLoading: false,
};

export const bulidsSlice = createSlice({
  name: 'builds',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<BuildModelArrayHomeworkApiResponse>) {
      state.list = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default bulidsSlice.reducer;
