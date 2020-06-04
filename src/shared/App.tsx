import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoutes } from './pages/AppRouter';
import { RootState } from './store/rootReducer';
import { getSettings } from './store/settings/settingsActions';
import { Spin } from './components/Spin/Spin';
import { Notify } from './containers/Notify/Notify';
import './index.css';
import { globalSlice } from 'store/global/globalSlice';

const App: FC = () => {
  const dispatch = useDispatch();

  const { isLoading, repoName } = useSelector((state: RootState) => ({
    isLoading: state.globalSlice.isLoading,
    repoName: state.settingsSlice.repoName,
  }));

  useEffect(() => {
    if (!repoName) dispatch(getSettings());
    if (window) {
      if (window.navigator.language === 'ru-RU') {
        dispatch(globalSlice.actions.setLocale('ru_RU'));
      } else {
        dispatch(globalSlice.actions.setLocale('en_US'));
      }
    }
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
