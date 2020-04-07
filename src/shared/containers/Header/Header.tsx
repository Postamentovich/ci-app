import React, { FC } from 'react';
import { compose, composeU } from '@bem-react/core';
import { Title as TitlePresenter } from '../../components/Title/Title';
import { withTitleTypeH1 } from '../../components/Title/_type/Title_type_h1';
import { withTitleViewDefault } from '../../components/Title/_view/Title_view_default';
import { withTitleViewLink } from '../../components/Title/_view/Title_view_link';
import { IHeaderProps, cnHeader } from './index';

const Title = compose(composeU(withTitleViewDefault, withTitleViewLink), withTitleTypeH1)(TitlePresenter);

export const Header: FC<IHeaderProps> = ({
  children,
  className,
  type = 'default',
  as: Component = 'header',
  title,
  to,
  ...props
}) => (
  <Component {...props} className={cnHeader({}, [className])}>
    <Title view={type} className={cnHeader('Title')} type="h1" to={to}>
      {title}
    </Title>
    <div className={cnHeader('Buttons')}>{children}</div>
  </Component>
);
