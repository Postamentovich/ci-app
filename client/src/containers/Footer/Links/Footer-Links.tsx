import React from 'react';
import { compose } from '@bem-react/core';
import { Link as LinkPresenter } from 'components/Link/Link';
import { withLinkViewDefault } from 'components/Link/_view/Link_view_default';
import { cnFooter } from '../index';

const Link = compose(withLinkViewDefault)(LinkPresenter);

const FooterLinks = () => (
  <div className={cnFooter('Links')}>
    <Link href="/support" title="Support" view="default" className={cnFooter('Link')}>
      Support
    </Link>
    <Link href="/learning" title="Learning" view="default" className={cnFooter('Link')}>
      Learning
    </Link>
  </div>
);

export default FooterLinks;