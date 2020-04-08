import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { RootState } from '../../store/rootReducer';
import { buildSelector, logSelector } from '../../store/builds/buildsSlice';
import { addBuildToQueue, getBuildDetails } from '../../store/builds/buildsActions';
import { Header } from '../../containers/Header/Header';
import { cnHeader } from '../../containers/Header';
import { Footer } from '../../containers/Footer/Footer';
import { Button as ButtonPresenter } from '../../components/Button/Button';
import { withButtonViewDefault } from '../../components/Button/_view/Button_view_default';
import { withButtonSizeS } from '../../components/Button/_size/Button_size_s';
import { withButtonViewAction } from '../../components/Button/_view/Button_view_action';
import { withButtonTypeLink } from '../../components/Button/_type/Button_type_link';
import { Icon as IconPresenter } from '../../components/Icon/Icon';
import { withIconTypeRepeat } from '../../components/Icon/_type/Icon_type_repeat';
import { withIconTypeGear } from '../../components/Icon/_type/Icon_type_gear';
import { Spin } from '../../components/Spin/Spin';
import { Log } from '../../components/Log/Log';
import { BuildCard as BuildCardPresenter } from '../../containers/BuildCard/BuildCard';
import { withBuildCardViewDetail } from '../../containers/BuildCard/_view/BuildCard_view_detail';
import './DetailsPage.css';

const cnDetails = cn('DetailsPage');

const Icon = compose(composeU(withIconTypeGear, withIconTypeRepeat))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  withButtonSizeS,
  withButtonTypeLink,
)(ButtonPresenter);

const BuildCard = compose(withBuildCardViewDetail)(BuildCardPresenter);

/**
 * Страница деталей билда
 */
const DetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { repoName, build, log, isBuildAdding } = useSelector(
    (state: RootState) => ({
      repoName: state.settingsSlice.repoName,
      log: logSelector(state, id!),
      build: buildSelector(state, id!),
      isBuildAdding: state.bulidsSlice.isBuildAdding,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getBuildDetails(id!));
  }, [dispatch, id]);

  /**
   * Обработка клика на кнопку Rebuild
   */
  const handleClickRebuild = useCallback(() => {
    if (!isBuildAdding) dispatch(addBuildToQueue(build?.commitHash!));
  }, [build, dispatch, isBuildAdding]);

  return (
    <div className={cnDetails()}>
      <Header className="Layout" title={repoName} type="link" to="/">
        <Button
          className={cnHeader('Button')}
          view="default"
          size="s"
          iconLeft={<Icon type="repeat" />}
          onClick={handleClickRebuild}
          disabled={isBuildAdding}
        >
          Rebuild
        </Button>
        <Button
          className={cnHeader('Button')}
          view="default"
          type="link"
          to="/settings"
          size="s"
          iconLeft={<Icon type="gear" />}
          disabled={isBuildAdding}
        />
      </Header>

      <div className={cnDetails('Content', ['Layout'])}>
        {build && (
          <BuildCard
            buildNumber={`#${build?.buildNumber}`}
            commitMessage={build?.commitMessage}
            branchName={build?.branchName}
            authorName={build?.authorName}
            date={build?.start}
            status={build?.status}
            key={build?.id}
            className={cnDetails('Card')}
            duration={build?.duration}
            commitHash={build?.commitHash}
            view="detail"
          />
        )}
        <div className={cnDetails('Log')}>
          {!log && <Spin />}

          {log && <Log ansi={log} />}
        </div>
      </div>

      <Footer className="Layout" />
    </div>
  );
};

export default DetailsPage;
