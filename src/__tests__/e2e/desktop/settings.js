const assert = require("chai").assert;

describe("Страница настроек", () => {
    it("Страница открывается", function () {
        return this.browser.url("/settings").isExisting(".SettingsPage").then(assert.isTrue);
    });

    it("На странице присутствует заголовок", function () {
        return this.browser
            .url("/settings")
            .getText(".SettingsPage-Title")
            .then((title) => {
                assert.equal(title, "Settings");
            });
    });
});
