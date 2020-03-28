import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'pages/AppRouter';
import { RootState } from 'store/rootReducer';
import { Spin } from 'components/Spin/Spin';
import { getSettings } from './store/settings/settingsActions';

const App: FC = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.globalSlice.isLoading,
  }));

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  if (isLoading) return <Spin />;

  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
