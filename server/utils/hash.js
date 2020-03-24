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

const minute5 = 5 * 60 * 1000;

function clearCache() {
  const now = Date.now().valueOf();
  hashObj.forEach((value, key) => {
    if (now - value.time > minute5) hashObj.delete(key);
  });
  console.log(hashObj.values(values => console.log(values)));
}

/**
 * Хранилище очищается каждые пять минут
 */
setInterval(() => {
  clearCache();
}, minute5);

module.exports = { hashObj, hashString };
