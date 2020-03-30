import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigurationModel } from 'api/models/models';

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

export const settingsSlice = createSlice({
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
    setInitialSettings(state, action: PayloadAction<ConfigurationModel>) {
      const { repoName, mainBranch, buildCommand, period } = action.payload;

      state.repoName = repoName;

      state.mainBranch = mainBranch;

      state.buildCommand = buildCommand;

      state.period = period;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
  },
});

export default settingsSlice.reducer;
