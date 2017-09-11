// Protractor configuration
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

"use strict";

var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var screenshotReporter = new HtmlScreenshotReporter({
    dest: "test-reports/screenshots",
    filename: "report.html",
    cleanDestination: true,
    captureOnlyFailedSpecs: true
});

var config = {
    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 110000,

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: process.env.E2E_BASE_URL || "http://localhost:" + (process.env.PORT || "9000"),

    // Credientials for Saucelabs
    sauceUser: process.env.E2E_SAUCE_USERNAME,
    sauceKey: process.env.E2E_SAUCE_ACCESS_KEY_PASSWORD,

    // When run without a command line parameter, all suites will run.
    // If run with --suite=smoke or --suite=smoke,full
    // only the patterns matched by the specified suites will run.
    suites: {
        smoke: "e2e/tests/**/*.smoke.spec.js",
        full: "e2e/tests/**/!(*.smoke).spec.js"
    },

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
    capabilities: {
        browserName: "chrome",
        name: "managerApp:univers-web",
        chromeOptions: { args: ["incognito", "disable-extensions"] },
        "phantomjs.binary.path": require("phantomjs-prebuilt").path,
        "phantomjs.ghostdriver.cli.args": ["--loglevel=DEBUG"],
        loggingPrefs: {
            browser: "ALL",
            performance: "ALL"
        },
        perfLoggingPrefs: {
            enableNetwork: true,
            enablePage: false,
            enableTimeline: false
        }
    },

    // ChromeDriver location is used to help find the chromedriver binary.
    // This will be passed to the Selenium jar as the system property
    // webdriver.chrome.driver. If null, Selenium will
    // attempt to find ChromeDriver using PATH.
    chromeDriver: "./node_modules/chromedriver/bin/chromedriver",

    // Path to the firefox application binary. If null, will attempt to find
    // firefox in the default locations.
    firefoxPath: null,

    // Boolean. If true, Protractor will connect directly to the browser Drivers
    // at the locations specified by chromeDriver and firefoxPath. Only Chrome
    // and Firefox are supported for direct connect.
    directConnect: false,

    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: "jasmine2",

    // ----- Options to be passed to minijasminenode -----
    //
    // See the full list at https://github.com/jasmine/jasmine-npm
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print: function () {}, // for jasmine-spec-reporter
        includeStackTrace: true
    },

    // The params object will be passed directly to the Protractor instance,
    // and can be accessed from your test as browser.params. It is an arbitrary
    // object and can contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user "Joe"
    params: {
        login: process.env.E2E_PARAM_LOGIN,
        password: process.env.E2E_PARAM_PASSWORD
    },

    plugins: [{
        path: "node_modules/ovh-protractor-jasmine2-logs-reporter/plugin.js"
    }],

    beforeLaunch: function () {
        // Setup the screenshot report before any tests start
        return new Promise(function (resolve) {
            screenshotReporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function () {
        // add jasmine spec reporter
        var SpecReporter = require("jasmine-spec-reporter");
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));

        if (config.capabilities && config.capabilities.browserName === "phantomjs") {
            global.browser.driver.manage().window().setSize(1280, 3000);
        }/* else {
            global.browser.driver.manage().window().maximize();
        }*/

        // add screenshot reporter
        jasmine.getEnv().addReporter(screenshotReporter);

        // add logs reporter
        var OvhLogsReporter = require("ovh-protractor-jasmine2-logs-reporter");
        jasmine.getEnv().addReporter(new OvhLogsReporter({
            baseDirectory: "test-reports/",
            fileName: "logs-client-report.json",
            enableHttpLogs: true
        }));
    },

    afterLaunch: function (exitCode) {
        // Close the screenshot report after all tests finish
        return new Promise(function (resolve) {
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};

config.params.baseUrl = config.baseUrl;
exports.config = config;
