import React from 'react';
import { cn } from '@bem-react/classname';
import { Header } from 'components/Header/Header';

const chHome = cn('HomePage');

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div className={chHome()}>
      <Header className='nlock'>XZ</Header>
      home
    </div>
  );
};

export default Home;
