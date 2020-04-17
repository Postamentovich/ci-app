require("dotenv").config();

module.exports = {
    baseUrl: "http://localhost:8500",
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
    plugins: {
        "html-reporter/hermione": {
            enabled: true,
            path: "src/__tests__/e2e/hermione-reports",
            defaultView: "all",
            baseHost: "http://localhost:8500",
        },
    },
};
