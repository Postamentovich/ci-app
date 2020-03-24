import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  isLoading: boolean;
};

const initialState: SettingsState = {
  isLoading: true,
};

const globalSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;

export default globalSlice.reducer;
