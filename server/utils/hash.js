/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

/**
 * Возвращает hash ключ из суммы строк
 * @param {string} s1
 * @param {string} s2
 *
 * @returns {string} - hash key
 */
function hashString(s1, s2) {
  return `${s1}${s2}`.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

/**
 * Хранилище значений
 */
const hashObj = new Map();

module.exports = { hashObj, hashString };
