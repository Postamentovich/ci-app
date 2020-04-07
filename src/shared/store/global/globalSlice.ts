import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notify = {
  /** Текст сообщения */
  message: string;
  /** id сообщения */
  id: number;
  /** Тип уведомления */
  type?: 'success' | 'error' | 'warning';
};

type GlobalState = {
  isLoading: boolean;
  notify: Array<Notify>;
};

const initialState: GlobalState = {
  /** Загрузка настроек пользователя */
  isLoading: true,
  /** Массив уведомлений */
  notify: [],
};

export const globalSlice = createSlice({
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

export default globalSlice.reducer;
