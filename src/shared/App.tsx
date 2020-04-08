import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRoutes } from "./pages/AppRouter";
import { RootState } from "./store/rootReducer";
import { getSettings } from "./store/settings/settingsActions";
import { Spin } from "./components/Spin/Spin";
import { Notify } from "./containers/Notify/Notify";
import "./index.css";

const App: FC = () => {
    const dispatch = useDispatch();

    const { isLoading, repoName } = useSelector((state: RootState) => ({
        isLoading: state.globalSlice.isLoading,
        repoName: state.settingsSlice.repoName,
    }));

    useEffect(() => {
        if (!repoName) dispatch(getSettings());
    }, [dispatch]);

    if (isLoading) return <Spin />;

    return (
        <div className="App">
            <AppRoutes />
            <Notify />
        </div>
    );
};

export default App;
