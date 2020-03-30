import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type Notify = {
  message: string;
  id: number;
};

type GlobalState = {
  isLoading: boolean;
  notify: Array<Notify>;
};

const initialState: GlobalState = {
  isLoading: true,
  notify: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addNotify(state, action: PayloadAction<Notify>) {
      state.notify = [...state.notify, action.payload];
    },
    removeNotify(state, action: PayloadAction<number>) {
      state.notify = state.notify.filter(el => el.id !== action.payload);
    },
  },
});

export const { setIsLoading, addNotify, removeNotify } = globalSlice.actions;

export default globalSlice.reducer;
