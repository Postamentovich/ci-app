/* eslint-disable react/no-danger */
import React, { FC } from 'react';
// @ts-ignore
import Convert from 'ansi-to-html';
import { ILogProps, cnLog } from './index';
import './Log.scss';

const convert = new Convert({
  fg: '#000',
});

/**
 * Компонент для создания лога
 */
export const Log: FC<ILogProps> = ({ children, className, as: Component = 'div', ansi, ...props }) => (
  <Component {...props} className={cnLog({}, [className])}>
    <pre
      className={cnLog('Container')}
      dangerouslySetInnerHTML={{
        __html: convert.toHtml(ansi),
      }}
    />
  </Component>
);
