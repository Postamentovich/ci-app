/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

/**
 * Возвращает hash ключ из суммы строк
 * @param {string} s1
 * @param {string} s2
 *
 * @returns {string} - hash key
 */
export function hashString(s1: string, s2 = '') {
  const hash = `${s1}${s2}`.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return String(hash);
}

export interface LogHash {
  data: string;
  time: number;
}

/**
 * Хранилище значений
 */
export const hashObj = new Map<string, LogHash>();

const minute5 = 5 * 60 * 1000;

export function clearCache() {
  const now = Date.now().valueOf();
  hashObj.forEach((value, key) => {
    if (now - value.time > minute5) hashObj.delete(key);
  });
}

/**
 * Хранилище очищается каждые пять минут
 */
setInterval(() => {
  clearCache();
}, minute5);
