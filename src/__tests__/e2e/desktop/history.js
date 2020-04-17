const assert = require("chai").assert;

describe("Страница истории билдов", () => {
    it("Страница открывается", function () {
        return this.browser.url("/").isExisting(".HistoryPage").then(assert.isTrue);
    });

    it("запуск билда", function () {
        return this.browser
            .url("/")
            .waitForExist(".Header-Buttons")
            .click("#RunBuildButton")
            .setValue("#commitHash", "123")
            .click(".NewBuildModal #RunBuildButton");
    });

    it("Переход на страницу настроек ", function () {
        return this.browser
            .url("/")
            .waitForExist(".Header-Buttons")
            .click("#SettingsButton")
            .waitForVisible(".SettingsPage", 3000)
            .getUrl()
            .then((res) => assert.equal(res, "http://localhost:8500/settings"));
    });
});
