const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const constants = require('./cypress/constants/constants');
const moment = require('moment-timezone');
const ISTtimestamp = moment.tz(Date.now(), 'Asia/Kolkata').format('DD-MM-YYYY_HH-mm-ss-SSS');
const { defineConfig } = require("cypress");
const fs = require('fs');
const { merge } = require("mochawesome-merge");
const generator = require('mochawesome-report-generator');

const reporterFormat = {
    template: "mochawesome",
    charts: true,
    reportPageTitle: 'Boostr UI Automation',
    reportFilename: `Report_${ISTtimestamp}`,
    hideMetadata: true,
    overwrite: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: true,
    json: false
};

module.exports = defineConfig({
    projectId: 'ua1fgd',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    screenshotOnRunFailure: true,
    video: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: reporterFormat,
    env: {
        grepFilterSpecs: true,
        Velynkenv: constants.VELYNKLOCALURL,
        B2Renv: constants.BOOSTRLOCALURL,
        browserPermissions: {
            geolocation: "allow",
        },
        "chromeWebSecurity": false,
        velynkUrl: 'http://localhost:3000',
        originReferer: 'http://localhost:9000',
    },
    e2e: {
        baseUrl: "http://localhost:9000",
        experimentalOriginDependencies: true,
        experimentalStudio: true,
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
            require('@cypress/grep/src/plugin')(config);
            require('@cypress/code-coverage/task')(on, config);
            config = cypressBrowserPermissionsPlugin(on, config);
            on('after:run', async () => {
                const mergedReport = await merge({
                    files: ['./cypress/reports/html/.jsons/*.json']
                });
                const totalNumberOfTestCases = mergedReport.stats.tests;
                const totalNumberOfPassedTestCases = mergedReport.stats.passes;
                const totalNumberOfFailedTestCases = mergedReport.stats.failures;
                const totalNumberOfPendingTestCases = mergedReport.stats.pending;
                const totalNumberOfSkippedTestCases = mergedReport.stats.skipped;

                // Generate the HTML report
                await generator.create(mergedReport, {
                    reportDir: './cypress/reports/html',
                    reportFilename: reporterFormat.reportFilename,
                    reportTitle: 'Boostr-UI'
                });

                const reportStats = {
                    tests: totalNumberOfTestCases,
                    passes: totalNumberOfPassedTestCases,
                    failures: totalNumberOfFailedTestCases,
                    pending: totalNumberOfPendingTestCases,
                    skipped: totalNumberOfSkippedTestCases
                };

                // Storing the data in a json file
                fs.writeFileSync(
                    'reportStats.json',
                    JSON.stringify(reportStats, null, 2)
                );
            });
            return config;
        }
    }
});
