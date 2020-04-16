require("dotenv").config();

module.exports = {
    baseUrl: "http://localhost:8500",
    screenshotsDir: "src/__tests__/screens",
    sets: {
        desktop: {
            files: "src/__tests__/e2e/desktop",
        },
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
            },
        },
    },
};
