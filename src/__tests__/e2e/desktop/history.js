const assert = require("chai").assert;

describe("Страница истории билдов", () => {
    it("Страница открывается", function () {
        return this.browser.url("/").isExisting(".HistoryPage").then(assert.isTrue);
    });

    it("запуск билда", function () {
        return this.browser
            .url("/")
            .click("#RunBuildButton")
            .setValue("#commitHash", "123")
            .click(".NewBuildModal #RunBuildButton");
    });
});
