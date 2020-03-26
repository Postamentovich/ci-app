import React from 'react';
import { compose } from '@bem-react/core';
import { Link as LinkPresenter } from 'components/Link/Link';
import { withLinkViewDefault } from 'components/Link/_view/Link_view_default';
import { cnFooter } from '../index';

const Link = compose(withLinkViewDefault)(LinkPresenter);

const FooterLinks = () => {
  return (
    <div className={cnFooter('Links')}>
      <Link href="/support" view="default" className={cnFooter('Link')}>
        Support
      </Link>
      <Link href="/learning" view="default" className={cnFooter('Link')}>
        Learning
      </Link>
    </div>
  );
};

export default FooterLinks;
