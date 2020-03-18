/**
 * Обработчик ошибок
 */
function errorHandler(error, req, res) {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
}

module.exports = errorHandler;
