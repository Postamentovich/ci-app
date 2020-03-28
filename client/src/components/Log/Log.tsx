import React, { FC } from 'react';
// @ts-ignore
import Converter from 'ansi-to-html';
import { ILogProps, cnLog } from './index';
import './Log.scss';

const convert = new Converter();

export const Log: FC<ILogProps> = ({ children, className, as: Component = 'div', ...props }) => (
  <Component {...props} className={cnLog({}, [className])}>
    <pre className={cnLog('Container')}>{convert.toHtml(String(children))}</pre>
  </Component>
);
