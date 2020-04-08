/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * Обработчик ошибок
 */
function errorHandler(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
}

module.exports = errorHandler;
