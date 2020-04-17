const assert = require("chai").assert;

describe("Страница настроек", () => {
    it("Страница открывается", function () {
        return this.browser.url("/settings").isExisting(".SettingsPage");
    });

    it("На странице присутствует заголовок", function () {
        return this.browser
            .url("/settings")
            .getText(".SettingsPage-Title")
            .then((title) => {
                assert.equal(title, "Settings");
            });
    });

    it("Отмена настроек", function () {
        return this.browser
            .url("/settings")
            .click("#buttonCancel")
            .waitForVisible(".HistoryPage", 3000)
            .getUrl()
            .then((res) => assert.equal(res, "http://localhost:8500/"));
    });
});
