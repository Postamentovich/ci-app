import React, { FC } from 'react';
import { Title as TitlePresenter } from 'components/Title/Title';
import { IHeaderProps, cnHeader } from './index';
import { withTitleTypeH1 } from 'components/Title/_type/Title_type_h1';
import { withTitleViewDefault } from 'components/Title/_view/Title_view_default';
import { compose } from '@bem-react/core';

const Title = compose(withTitleViewDefault, withTitleTypeH1)(TitlePresenter);

export const Header: FC<IHeaderProps> = ({ children, className, as: Component = 'header', title, ...props }) => (
  <Component {...props} className={cnHeader({}, [className])}>
    <Title type="h1" className={cnHeader('Title')} view="default">
      {title}
    </Title>
    <div className={cnHeader('Buttons')}>{children}</div>
  </Component>
);
