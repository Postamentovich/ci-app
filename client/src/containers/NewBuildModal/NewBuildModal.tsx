import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { Button as ButtonPresenter } from 'components/Button/Button';
import { withButtonSizeM } from 'components/Button/_size/Button_size_m';
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import './NewBuildModal.scss';
import { Modal } from 'components/Modal/Modal';
import { TextInput } from 'components/TextInput/TextInput';
import { withButtonViewPseudo } from 'components/Button/_view/Button_view_pseudo';

const cnNewBuildModal = cn('NewBuildModal');

const Button = compose(
  composeU(withButtonViewAction, withButtonViewPseudo),
  withButtonSizeM,
  withButtonTypeLink,
)(ButtonPresenter);

export interface NewBuildModalProps {
  onConfirm: (commitHash: string) => void;
  onCancel: () => void;
}

export const NewBuildModal: React.SFC<NewBuildModalProps> = ({ onConfirm, onCancel }) => {
  const [value, setValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickConfirm = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    onConfirm('value');
  };

  const handleClickCancel = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    onCancel();
  };

  return (
    <Modal className={cnNewBuildModal()}>
      <h3 className={cnNewBuildModal('Title')}>New build</h3>
      <p className={cnNewBuildModal('Description')}>Enter the commit hash which you want to buid</p>
      <TextInput id="commitHash" placeholder="Commit hash" value={value} onChange={handleChangeInput} />
      <div className={cnNewBuildModal('Buttons')}>
        <Button view="action" size="m" className={cnNewBuildModal('Button')} onClick={handleClickConfirm}>
          Run build
        </Button>
        <Button size="m" view="pseudo" className={cnNewBuildModal('Button')} onClick={handleClickCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
