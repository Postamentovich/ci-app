import React, { FC } from 'react';
import { IFooterProps, cnFooter } from './index';
import FooterLinks from './Links/Footer-Links';
import FooterCopyright from './Copyright/Footer-Copyright';
import './Footer.css';

/**
 * Компонент для создания футера
 */
export const Footer: FC<IFooterProps> = ({ children, className, as: Component = 'footer', ...props }) => (
  <Component {...props} className={cnFooter({}, [className])}>
    <FooterLinks />
    <FooterCopyright />
  </Component>
);
