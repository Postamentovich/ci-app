import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import { BuildStatus } from '../../api/models/models';

export interface IBuildCardProps extends IClassNameProps {
  /**
   * Номер билда
   */
  buildNumber?: string;
  /**
   * Описание коммита
   */
  commitMessage?: string;
  /**
   * Hash коммита
   */
  commitHash?: string;
  /**
   * Имя ветки
   */
  branchName?: string;
  /**
   * Имя автора
   */
  authorName?: string;
  /**
   * Статус билда
   */
  status?: BuildStatus;
  /**
   * Дата начала запуска билда
   */
  date?: string;
  /**
   * Продолжительность сборки
   */
  duration?: number;
  /**
   * Адрес
   */
  to?: string;
  /**
   * Тип карточки
   */
  type?: 'link';
}

export const cnBuildCard = cn('BuildCard');
