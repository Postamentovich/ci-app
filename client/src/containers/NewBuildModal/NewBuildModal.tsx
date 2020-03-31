import React, { useState, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { compose, composeU } from '@bem-react/core';
import { Button as ButtonPresenter } from 'components/Button/Button';
import { withButtonSizeM } from 'components/Button/_size/Button_size_m';
import { withButtonViewAction } from 'components/Button/_view/Button_view_action';
import { withButtonTypeLink } from 'components/Button/_type/Button_type_link';
import { withButtonViewPseudo } from 'components/Button/_view/Button_view_pseudo';
import { Modal } from 'components/Modal/Modal';
import { TextInput as TextInputPresenter } from 'components/TextInput/TextInput';
import { withTextInputNotValid } from 'components/TextInput/_notValid/TextInput_notValid';
import './NewBuildModal.scss';

const cnNewBuildModal = cn('NewBuildModal');

const Button = compose(
  composeU(withButtonViewAction, withButtonViewPseudo),
  withButtonSizeM,
  withButtonTypeLink,
)(ButtonPresenter);

const TextInput = compose(withTextInputNotValid)(TextInputPresenter);

export interface NewBuildModalProps {
  onConfirm: (commitHash: string) => void;
  onCancel: () => void;
}

/**
 * Модальное окно с добавлением нового билда
 */
export const NewBuildModal: React.SFC<NewBuildModalProps> = ({ onConfirm, onCancel }) => {
  const [value, setValue] = useState('');

  /**
   * Состояние валидности поля repoName
   */
  const [commitHashNotValid, setCommitHashNotValid] = useState(false);

  /**
   * Обработка поля commitHash
   */
  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitHashNotValid(false);
    setValue(e.target.value);
  }, []);

  /**
   * Очистка поля commitHash
   */
  const handleClickClear = useCallback(() => {
    setCommitHashNotValid(false);
    setValue('');
  }, []);

  /**
   * Обработка клика на кнопку подтверждения
   */
  const handleClickConfirm = useCallback(
    (e: React.MouseEventHandler<HTMLButtonElement>) => {
      if (!value.length) return setCommitHashNotValid(true);

      onConfirm(value);
    },
    [onConfirm, value],
  );

  /**
   * Обработка клика на кнопку отмены
   */
  const handleClickCancel = useCallback(
    (e: React.MouseEventHandler<HTMLButtonElement>) => {
      onCancel();
    },
    [onCancel],
  );

  return (
    <Modal className={cnNewBuildModal()}>
      <h3 className={cnNewBuildModal('Title')}>New build</h3>

      <p className={cnNewBuildModal('Description')}>Enter the commit hash which you want to buid</p>

      <TextInput
        id="commitHash"
        placeholder="Commit hash"
        value={value}
        onChange={handleChangeInput}
        hasClear={value.length > 0}
        onClearClick={handleClickClear}
        notValid={commitHashNotValid}
      />

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
