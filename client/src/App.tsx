import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from 'pages/AppRouter';
import { RootState } from 'store/rootReducer';
import { getSettings } from 'store/settings/settingsActions';
import { Spin } from 'components/Spin/Spin';
import { Notify } from 'containers/Notify/Notify';

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
    <div className="App">
      <AppRoutes />
      <Notify />
    </div>
  );
};

export default App;
