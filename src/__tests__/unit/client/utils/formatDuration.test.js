import { formatDuration } from "../../../../shared/utils/formatDuration";

describe("Форматирование длительности", () => {
    test("Длительность меньше часа", () => {
        const duration = 3000;
        const result = "0 мин 3 сек";
        const formatedDuration = formatDuration(duration);
        expect(formatedDuration).toBe(result);
    });
    test("Длительность больше часа", () => {
        const duration = 3600000;
        const result = "1 ч 0 мин";
        const formatedDuration = formatDuration(duration);
        expect(formatedDuration).toBe(result);
    });
});
