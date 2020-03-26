import React from 'react';
import { cn } from '@bem-react/classname';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

const chHome = cn('HomePage');

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div className={chHome()}>
      <Header>XZ</Header>
      <Footer className="Layout" />
      home
    </div>
  );
};

export default Home;
