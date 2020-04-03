import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildModel } from 'api/models/models';
import { RootState } from 'store/rootReducer';

type BuildState = {
  /** Список билдов */
  list: Array<BuildModel>;
  /** Флаг загрузки списка билдов */
  isBuildListLoading: boolean;
  /** Флаг загрузки лога билда  */
  isLogLoading: boolean;
  /** Логи для билдов */
  log: {
    [key: string]: string;
  };
};

const initialState: BuildState = {
  list: [],
  log: {},
  isBuildListLoading: false,
  isLogLoading: false,
};

export const bulidsSlice = createSlice({
  name: 'builds',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Array<BuildModel>>) {
      state.list = action.payload;
    },
    addBuildToList(state, action: PayloadAction<BuildModel>) {
      if (state.list.find((el) => el.id === action.payload.id)) {
        state.list = state.list.map((build) => {
          if (build.id === action.payload.id) build = action.payload;
          return build;
        });
      } else {
        state.list = [...state.list, action.payload];
      }
    },
    setLog(state, action: PayloadAction<{ id: string; log: string }>) {
      const { id, log } = action.payload;
      state.log[id] = log;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isBuildListLoading = action.payload;
    },
    setIsLogLoading(state, action: PayloadAction<boolean>) {
      state.isLogLoading = action.payload;
    },
  },
});

export const buildSelector = (state: RootState, id: string) => {
  return state.bulidsSlice.list.find((build) => build.id === id);
};

export const logSelector = (state: RootState, id: string) => {
  return state.bulidsSlice.log[id];
};

export default bulidsSlice.reducer;
