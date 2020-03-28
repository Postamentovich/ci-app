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
import { Card as CardPresenter } from 'components/Card/Card';
import { withCardTypeLink } from 'components/Card/_type/Card_type_link';
import { Modal } from 'components/Modal/Modal';
import { TextInput } from 'components/TextInput/TextInput';

const cnHistory = cn('HistoryPage');

const Icon = compose(composeU(withIconTypePlay, withIconTypeGear))(IconPresenter);

const Button = compose(
  composeU(withButtonViewDefault, withButtonViewAction),
  composeU(withButtonSizeS, withButtonSizeM),
  withButtonTypeLink,
)(ButtonPresenter);

const Card = compose(withCardTypeLink)(CardPresenter);

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
        {list.map(({ buildNumber, commitMessage, branchName, authorName, start, id, status }) => (
          <Card
            taskId={`#${buildNumber}`}
            message={commitMessage}
            branchName={branchName}
            authorName={authorName}
            date={String(start)}
            status={status}
            key={id}
            className={cnHistory('Card')}
            type="link"
            to={`/build/${id}`}
          />
        ))}
      </div>
      <Footer className="Layout" />
      <Modal>
        <h3>New build</h3>
        <p>Enter the commit hash which you want to buid</p>
        <TextInput id="commitHash" placeholder="Commit hash" />
        <Button view="action" size="m">
          Run build
        </Button>
        <Button size="m"> Cancel</Button>
      </Modal>
    </div>
  );
};

export default BuildHistory;
