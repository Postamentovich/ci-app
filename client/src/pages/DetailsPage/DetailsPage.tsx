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
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { cnHeader } from 'components/Header';
import { buildSelector } from 'store/builds/buildsSlice';
import { useParams } from 'react-router-dom';
import { getBuildLog } from 'store/builds/buildsActions';
import Loader from 'components/Loader/Loader';
import { Log } from 'components/Log/Log';
import './DetailsPage.scss';
import { withIconTypeRepeat } from 'components/Icon/_type/Icon_type_repeat';
import { BuildCard } from 'containers/BuildCard/BuildCard';

const cnDetails = cn('DetailsPage');

const Icon = compose(composeU(withIconTypeGear, withIconTypeRepeat))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  withButtonSizeS,
  withButtonTypeLink,
)(ButtonPresenter);

const BuildDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { repoName, build, log, isLogLoading } = useSelector(
    (state: RootState) => ({
      repoName: state.settingsSlice.repoName,
      log: state.bulidsSlice.log,
      build: buildSelector(state, id!),
      isLogLoading: state.bulidsSlice.isLogLoading,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (!log[id!] && !isLogLoading) dispatch(getBuildLog(id!));
  }, [dispatch, id, isLogLoading, log]);

  return (
    <div className={cnDetails()}>
      <Header className="Layout" title={repoName || ''}>
        <Button className={cnHeader('Button')} view="default" size="s" iconLeft={<Icon type="repeat" />}>
          Rebuild
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
      <div className={cnDetails('Content', ['Layout'])}>
        <BuildCard
          taskId={`#${build?.buildNumber}`}
          message={build?.commitMessage}
          branchName={build?.branchName}
          authorName={build?.authorName}
          date={String(build?.start)}
          status={build?.status}
          key={build?.id}
          className={cnDetails('Card')}
          duration={build?.duration}
          // type="link"
          // to={`/build/${build?.id}`}
        />
        <div className={cnDetails('Log')}>
          {isLogLoading && <Loader />}
          <Log>{log[id!]}</Log>
        </div>
      </div>
      <Footer className="Layout" />
    </div>
  );
};

export default BuildDetails;
