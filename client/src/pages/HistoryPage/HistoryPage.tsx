import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { Header } from 'containers/Header/Header';
import { Footer } from 'containers/Footer/Footer';
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
import { cnHeader } from 'containers/Header';
import { withIconTypePlay } from 'components/Icon/_type/Icon_type_play';
import { getBuildList } from 'store/builds/buildsActions';
import { withButtonViewPseudo } from 'components/Button/_view/Button_view_pseudo';
import { NewBuildModal } from 'containers/NewBuildModal/NewBuildModal';
import { BuildCard } from 'containers/BuildCard/BuildCard';

const cnHistory = cn('HistoryPage');

const Icon = compose(composeU(withIconTypePlay, withIconTypeGear))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction, withButtonViewPseudo),
  composeU(withButtonSizeS, withButtonSizeM),
  withButtonTypeLink,
)(ButtonPresenter);

export const HistoryPage = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleClickRunBuild = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    setModalIsOpen(true);
  };

  const handleClickModalConfirm = (value: string) => {
    setModalIsOpen(false);
  };

  const handleClickModalCancel = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={cnHistory()}>
      <Header className="Layout" title={repoName || ''} type="link" to="/">
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
        {list.map(({ buildNumber, commitHash, commitMessage, branchName, authorName, start, id, status, duration }) => (
          <BuildCard
            taskId={`#${buildNumber}`}
            message={commitMessage}
            commitHash={commitHash}
            branchName={branchName}
            authorName={authorName}
            date={String(start)}
            duration={duration}
            status={status}
            key={id}
            className={cnHistory('Card')}
            type="link"
            to={`/build/${id}`}
          />
        ))}
      </div>
      <Footer className="Layout" />
      {modalIsOpen && <NewBuildModal onCancel={handleClickModalCancel} onConfirm={handleClickModalConfirm} />}
    </div>
  );
};
