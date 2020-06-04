import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from 'models/UserSettings';

type SettingsState = {
  /** Имя репозитория */
  repoName: string;
  /** Команда запуска билда */
  buildCommand: string;
  /** Ветка */
  mainBranch: string;
  /** Интервал проверки новых коммитов */
  period: number;
  /** Флаг сохранения настроек */
  isSaving: boolean;
};

export const initialState: SettingsState = {
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
      state.period = Number(action.payload);
    },
    setInitialSettings(state, action: PayloadAction<UserSettings>) {
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
