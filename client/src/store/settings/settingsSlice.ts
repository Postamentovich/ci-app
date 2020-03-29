import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
  isSaving: boolean;
};

const initialState: SettingsState = {
  repoName: '',
  buildCommand: '',
  mainBranch: 'master',
  period: 10,
  isSaving: false,
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
    changePeriod(state, action: PayloadAction<number>) {
      state.period = action.payload;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
  },
});

export const {
  changeRepoName,
  changeBuildCommand,
  changeMainBranch,
  changePeriod,
  setIsSaving,
} = settingsSlice.actions;

export default settingsSlice.reducer;
