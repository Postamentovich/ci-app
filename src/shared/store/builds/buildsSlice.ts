import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { BuildModel } from 'models/BuildModel';
import { QueueBuildResponse } from 'models/QueueBuildResponse';

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
  /** Загружаемая страницы для билдов */
  page: number;
  /** Флаг загрузки дополнительных билдов */
  isMoreBuildsLoading: boolean;
  /** Флаг выполнения запроса добавления билда в очередь */
  isBuildAdding: boolean;
};

const initialState: BuildState = {
  list: [],
  log: {},
  isBuildListLoading: false,
  isLogLoading: false,
  page: 1,
  isMoreBuildsLoading: false,
  isBuildAdding: false,
};

export const bulidsSlice = createSlice({
  name: 'builds',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Array<BuildModel>>) {
      const newList = [...state.list];

      action.payload.forEach((el) => {
        const index = newList.findIndex((item) => item.id === el.id);

        if (index > -1) {
          newList[index] = el;
        } else newList.push(el);
      });

      state.list = newList.sort((a, b) => b.buildNumber - a.buildNumber);
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
    setIsMoreBuildsLoading(state, action: PayloadAction<boolean>) {
      state.isMoreBuildsLoading = action.payload;
    },
    setIsBuildAdding(state, action: PayloadAction<boolean>) {
      state.isBuildAdding = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetList(state) {
      state.list = [];
    },
  },
});

// eslint-disable-next-line arrow-body-style
export const buildSelector = (state: RootState, id: string) => {
  return state.bulidsSlice.list.find((build) => build.id === id);
};

// eslint-disable-next-line arrow-body-style
export const logSelector = (state: RootState, id: string) => {
  return state.bulidsSlice.log[id];
};

export default bulidsSlice.reducer;
