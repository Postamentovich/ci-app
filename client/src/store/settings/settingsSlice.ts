import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  repoName: string | null;
  buildCommand: string | null;
  mainBranch: string | null;
  period: number | null;
};

const initialState: SettingsState = {
  repoName: null,
  buildCommand: null,
  mainBranch: null,
  period: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeRepoName(state, action: PayloadAction<string>) {
      state.repoName = action.payload;
    },
    changeBuildCommand(state, action: PayloadAction<string>) {
      state.buildCommand = action.payload;
    },
    changeMainBranch(state, action: PayloadAction<string>) {
      state.mainBranch = action.payload;
    },
    changePeriod(state, action: PayloadAction<string>) {
      state.mainBranch = action.payload;
    },
  },
});

export const { changeRepoName, changeBuildCommand, changeMainBranch, changePeriod } = settingsSlice.actions;

export default settingsSlice.reducer;
