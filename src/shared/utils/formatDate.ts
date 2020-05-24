import { Locale } from 'store/global/globalSlice';

/**
 * Форматирует дату в нужный формат
 */
export const formatDate = (date: string, locale: Locale) => {
  const _locale = locale === 'ru_RU' ? 'ru-RU' : 'en-US';

  return new Intl.DateTimeFormat(_locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(new Date(date))
    .replace(/\.,/, ',');
};
