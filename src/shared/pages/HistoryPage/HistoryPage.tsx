/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from 'store/rootReducer';
import {
  getBuildList,
  addBuildToQueue,
  cancelPollingBuildList,
  getMoreBuilds,
} from '../../store/builds/buildsActions';
import { Header } from '../../containers/Header/Header';
import { cnHeader } from '../../containers/Header';
import { Footer } from '../../containers/Footer/Footer';
import { NewBuildModal } from '../../containers/NewBuildModal/NewBuildModal';
import { BuildCard } from '../../containers/BuildCard/BuildCard';
import { Spin } from '../../components/Spin/Spin';
import { Button as ButtonPresenter } from '../../components/Button/Button';
import { withButtonViewDefault } from '../../components/Button/_view/Button_view_default';
import { withButtonSizeS } from '../../components/Button/_size/Button_size_s';
import { withButtonSizeM } from '../../components/Button/_size/Button_size_m';
import { withButtonViewAction } from '../../components/Button/_view/Button_view_action';
import { withButtonTypeLink } from '../../components/Button/_type/Button_type_link';
import { withButtonProgress } from '../../components/Button/_progress/Button_progress';
import { withButtonViewPseudo } from '../../components/Button/_view/Button_view_pseudo';
import { Icon as IconPresenter } from '../../components/Icon/Icon';
import { withIconTypeGear } from '../../components/Icon/_type/Icon_type_gear';
import { withIconTypePlay } from '../../components/Icon/_type/Icon_type_play';
import './HistoryPage.css';

const cnHistory = cn('HistoryPage');

const Icon = compose(composeU(withIconTypePlay, withIconTypeGear))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction, withButtonViewPseudo),
  composeU(withButtonSizeS, withButtonSizeM),
  withButtonTypeLink,
  withButtonProgress,
)(ButtonPresenter);

/**
 * Страница истории билдов
 */
const HistoryPage = () => {
  const dispatch = useDispatch();

  const { repoName, list, isLoading, isMoreBuildsLoading } = useSelector(
    (state: RootState) => ({
      repoName: state.settingsSlice.repoName,
      list: state.bulidsSlice.list,
      isLoading: state.bulidsSlice.isBuildListLoading,
      isMoreBuildsLoading: state.bulidsSlice.isMoreBuildsLoading,
    }),
    shallowEqual,
  );

  /**
   * Состояние модального окна
   */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /**
   * Получение списка билдов
   */
  useEffect(() => {
    dispatch(getBuildList());

    return () => {
      dispatch(cancelPollingBuildList());
    };
  }, [dispatch]);

  /**
   * Обработка клика на кнопку 'Run Build'
   */
  const handleClickRunBuild = useCallback((e: React.MouseEventHandler<HTMLButtonElement>) => {
    setModalIsOpen(true);
  }, []);

  /**
   * Обработка клика на кнопку подтверждения в модальном окне
   */
  const handleClickModalConfirm = useCallback(
    (value: string) => {
      dispatch(addBuildToQueue(value));

      setModalIsOpen(false);
    },
    [dispatch],
  );

  /**
   * Обработка клика на кнопку отмеsны в модальном окне
   */
  const handleClickModalCancel = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleClickShowMore = useCallback(() => {
    if (!isMoreBuildsLoading) dispatch(getMoreBuilds());
  }, [dispatch, isMoreBuildsLoading]);

  return (
    <div className={cnHistory()}>
      <Header className="Layout" title={repoName} type="link" to="/">
        <Button
          className={cnHeader('Button')}
          view="default"
          size="s"
          iconLeft={<Icon type="play" />}
          onClick={handleClickRunBuild}
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
        {!list.length && isLoading && <Spin />}

        {!list.length && !isLoading && <span>You don't have any builds</span>}

        {list.length > 0 &&
          list.map(
            ({
              buildNumber,
              commitHash,
              commitMessage,
              branchName,
              authorName,
              start,
              id,
              status,
              duration,
            }) => (
              <BuildCard
                buildNumber={`#${buildNumber}`}
                commitMessage={commitMessage}
                commitHash={commitHash}
                branchName={branchName}
                authorName={authorName}
                date={start}
                duration={duration}
                status={status}
                key={id}
                className={cnHistory('Card')}
                type="link"
                to={`/build/${id}`}
              />
            ),
          )}

        {list.length > 0 && (
          <Button
            progress={isMoreBuildsLoading}
            disabled={isMoreBuildsLoading}
            onClick={handleClickShowMore}
            className={cnHistory('Button')}
            view="default"
            size="m"
          >
            Show more
          </Button>
        )}
      </div>

      <Footer className="Layout" />

      {modalIsOpen && <NewBuildModal onCancel={handleClickModalCancel} onConfirm={handleClickModalConfirm} />}
    </div>
  );
};

export default HistoryPage;
