/**
 * Форматирует длительность в нужный формат
 */
export const formatDuration = (duration: number) => {
    const date = new Date(0, 0, 0, 0, 0, 0, duration);

    const hours = date.getHours();

    const minutes = date.getMinutes();

    const seconds = date.getSeconds();

    const formatedDuration = hours ? `${hours} ч ${minutes} мин` : `${minutes} мин ${seconds} сек`;

    return formatedDuration;
};
