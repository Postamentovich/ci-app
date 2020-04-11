/**
 * Форматирует дату в нужный формат
 */
export const formatDate = (date: string) =>
    new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    })
        .format(new Date(date))
        .replace(/\.,/, ",");
