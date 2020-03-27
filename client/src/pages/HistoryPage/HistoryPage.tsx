import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { Button as ButtonPresenter } from 'components/Button/Button';
import { withButtonViewDefault } from 'components/Button/_view/Button_view_default';
import { Icon as IconPresenter } from 'components/Icon/Icon';
import { withIconTypeGear } from 'components/Icon/_type/Icon_type_gear';
import { withButtonSizeS } from 'components/Button/_size/Button_size_s';
import { withButtonSizeM } from 'components/Button/_size/Button_size_m';
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import './HistoryPage.scss';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { cnHeader } from 'components/Header';
import { withIconTypePlay } from 'components/Icon/_type/Icon_type_play';
import { getBuildList } from 'store/builds/buildsActions';
import { Card } from 'components/Card/Card';

const cnHistory = cn('HistoryPage');

const Icon = compose(composeU(withIconTypePlay, withIconTypeGear))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  composeU(withButtonSizeS, withButtonSizeM),
  withButtonTypeLink,
)(ButtonPresenter);

const BuildHistory = () => {
  const dispatch = useDispatch();

  const { repoName, list } = useSelector(
    (state: RootState) => ({
      repoName: state.settingsSlice.repoName,
      list: state.bulidsSlice.list,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getBuildList());
  }, [dispatch]);

  return (
    <div className={cnHistory()}>
      <Header className="Layout" title={repoName || ''}>
        <Button
          className={cnHeader('Button')}
          view="default"
          type="link"
          to="/settings"
          size="s"
          iconLeft={<Icon type="play" />}
        >
          Run build
        </Button>
        <Button
          className={cnHeader('Button')}
          view="default"
          type="link"
          to="/settings"
          size="s"
          iconLeft={<Icon type="gear" />}
        />
      </Header>
      <div className={cnHistory('Content', ['Layout'])}>
        {list.map(build => {
          return <Card />;
        })}
      </div>
      <Footer className="Layout" />
    </div>
  );
};

export default BuildHistory;
