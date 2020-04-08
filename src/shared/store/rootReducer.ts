import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import bulidsSlice from "./builds/buildsSlice";
import settingsSlice from "./settings/settingsSlice";
import globalSlice from "./global/globalSlice";
import createUniversalHistory from "./history";

export const history = createUniversalHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    settingsSlice,
    globalSlice,
    bulidsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
