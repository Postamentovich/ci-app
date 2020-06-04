/**
 * Обработчик ошибок
 */
// TODO дописать типы
export function errorHandler(error: any, req: any, res: any, next: any) {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
}
