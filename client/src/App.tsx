import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRoutes } from 'pages/AppRouter';
import { RootState } from 'store/rootReducer';
import { Spin } from 'components/Spin/Spin';
import { Notify } from 'containers/Notify/Notify';

const App: FC = () => {
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.globalSlice.isLoading,
  }));

  if (isLoading) return <Spin />;

  return (
    <div className="App">
      <AppRoutes />
      <Notify />
    </div>
  );
};

export default App;
