import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentDisplay {
  displayType: 'issues' | 'comments';
  issueId: number | null;
  test: boolean;
}

interface CurrentDisplayPayload {
  displayType: 'issues' | 'comments';
  issueId?: number;
}

interface CurrentRepo {
  org: string;
  repo: string;
}

type CurrentDisplayState = {
  page: number;
} & CurrentDisplay &
  CurrentRepo;

const initialState: CurrentDisplayState = {
  org: 'rails',
  repo: 'rails',
  test: true,
  page: 1,
  displayType: 'issues',
  issueId: null,
};

const settingsSlice = createSlice({
  name: 'issuesDisplay',
  initialState,
  reducers: {
    displayRepo(state, action: PayloadAction<CurrentRepo>) {
      const { org, repo } = action.payload;
      state.org = org;
      state.repo = repo;
    },
    add: () => {},
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCurrentDisplayType(state, action: PayloadAction<CurrentDisplayPayload>) {
      const { displayType, issueId = null } = action.payload;
      state.displayType = displayType;
      state.issueId = issueId;
    },
  },
});

export const { displayRepo, setCurrentDisplayType, setCurrentPage } = settingsSlice.actions;

export default settingsSlice.reducer;
