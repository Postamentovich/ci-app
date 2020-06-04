import React, { useCallback } from 'react';
import { compose } from '@bem-react/core';
import { useTranslation } from 'react-i18next';
import { Link as LinkPresenter } from '../../../components/Link/Link';
import { withLinkViewDefault } from '../../../components/Link/_view/Link_view_default';
import { cnFooter } from '../index';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { globalSlice } from 'store/global/globalSlice';

const Link = compose(withLinkViewDefault)(LinkPresenter);

const FooterLinks = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { locale } = useSelector((state: RootState) => ({
    locale: state.globalSlice.locale,
  }));

  const changeLocale = useCallback(() => {
    const newLocale = locale === 'ru_RU' ? 'en_US' : 'ru_RU';
    dispatch(globalSlice.actions.setLocale(newLocale));
  }, [locale]);

  return (
    <div className={cnFooter('Links')}>
      <Link href="/support" title="Support" view="default" className={cnFooter('Link')}>
        {t('support')}
      </Link>
      <Link href="/learning" title="Learning" view="default" className={cnFooter('Link')}>
        {t('learning')}
      </Link>
      <Link
        href="/learning"
        title="Learning"
        view="default"
        className={cnFooter('Link')}
        as="button"
        onClick={changeLocale}
      >
        {locale === 'ru_RU' ? t('enVersion') : t('ruVersion')}
      </Link>
    </div>
  );
};

export default FooterLinks;
