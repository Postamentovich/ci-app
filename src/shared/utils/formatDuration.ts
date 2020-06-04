import { Locale } from 'store/global/globalSlice';

/**
 * Форматирует длительность в нужный формат
 */
export const formatDuration = (duration: number, locale: Locale) => {
  const date = new Date(0, 0, 0, 0, 0, 0, duration);

  const hours = date.getHours();

  const minutes = date.getMinutes();

  const seconds = date.getSeconds();

  const hoursShort = locale === 'ru_RU' ? 'ч' : 'hr';

  const minutesShort = locale === 'ru_RU' ? 'мин' : 'min';

  const secondsShort = locale === 'ru_RU' ? 'сек' : 'sec';

  const formatedDuration = hours
    ? `${hours} ${hoursShort} ${minutes} ${minutesShort}`
    : `${minutes} ${minutesShort} ${seconds} ${secondsShort}`;

  return formatedDuration;
};
