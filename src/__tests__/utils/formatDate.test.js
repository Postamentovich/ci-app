import { formatDate } from "../../shared/utils/formatDate";

test("Форматирование времени", () => {
    const date = "2020-04-09T01:41:25.898";
    const result = "9 апр, 01:41";
    const formatedDate = formatDate(date);
    expect(formatedDate).toBe(result);
});
