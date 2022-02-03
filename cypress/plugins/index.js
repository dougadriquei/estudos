/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// };

//cypress/plugins/index.js
module.exports = (on, config) => {
  on("after:run", (results) => {
    if (results) {
      console.log(results.totalPassed, "out of", results.totalTests, "passed");
      if (results.totalPassed !== results.totalTests) {
        //todo como buscar o screenshot da execução do build do Dockerfile
        // throw new Error(
        //   `
        //     Problema identificado nos testes...   \n
        //     Primeiro teste com erro: ${results.runs[0]?.tests[0]?.title} \n
        //     Primeiro teste com erro spec name: ${spec.name} \n
        //     Primeiro teste com erro spec results: ${spec.results} \n
        //     Erro: ${results.runs[0]?.tests[0]?.body} - ${results.runs[0]?.tests[0]?.displayError} \n
        //     Mais detalhes:  ${results.runs[0]?.tests[0]?.attempts[0]?.error?.stack}  \n
        //     Screenshot: "${results.runs[0]?.tests[0]?.attempts[0]?.path}
        //   `
        // );
        // if (
        //   results &&
        //   results.runs &&
        //   results.runs[0].tests &&
        //   results.runs[0].tests[0].attempts
        // ) {
        //   const string =
        //     " Problema identificado nos testes...\n Único(Primeiro) problema identificado: " +
        //     results.runs[0].tests[0].title +
        //     "\nErro: " +
        //     results.runs[0].tests[0].body +
        //     " - " +
        //     results.runs[0].tests[0].displayError +
        //     "\nScreenshot: " +
        //     results.runs[0].tests[0].attempts[0].path;
        //   console.log(string);
        // }
      }
      if (
        results &&
        results.stats &&
        results.stats.failures === 0 &&
        results.video
      ) {
        // `del()` returns a promise, so it's important to return it to ensure
        // deleting the video is finished before moving on
        return del(results.video);
      }
    }
  });
};

/* results will look something like this when run via `cypress run`:
    // {
    //   "cypressVersion": "3.0.2",
    //   "endedTestsAt": "2018-07-11T17:53:35.675Z",
    //   "browserName": "electron",
    //   "browserPath": "path/to/browser",
    //   "browserVersion": "59.0.3071.115",
    //   "config": {...},
    //   "osName": "darwin",
    //   "osVersion": "14.5.0",
    //   "runs": [{
    //     "error": null,
    //     "hooks": [{
    //       "hookName": "before each",
    //       "title": [ "before each hook" ],
    //       "body": "function () {\n  expect(true).to.be["true"];\n}"
    //     }],
    //     "reporter": "spec",
    //     "reporterStats": {...},
    //     "shouldUploadVideo": true,
    //     "spec": {...},
    //     "stats": {
    //       "suites": 1,
    //       "tests": 1,
    //       "passes": 0,
    //       "pending": 0,
    //       "skipped": 0,
    //       "failures": 1,
    //       "startedAt": "2020-08-05T08:38:37.589Z",
    //       "endedAt": "2018-07-11T17:53:35.675Z",
    //       "duration": 1171
    //     },
    //     "tests": [{
    //       "title": [ "test" ],
    //       "state": "failed",
    //       "body": "function () {\n  expect(true).to.be["false"];\n}",
    //       "displayError": "AssertionError: expected true to be false\n' +
    //       '    at Context.eval (...cypress/integration/spec.js:5:21",
    //       "attempts": [{
    //         "state": "failed",
    //         "error": {
    //           "message": "expected true to be false",
    //           "name": "AssertionError",
    //           "stack": "AssertionError: expected true to be false\n' +
    //       '    at Context.eval (...cypress/integration/spec.js:5:21"
    //         },
    //         "screenshots": [{
    //           "name": null,
    //           "takenAt": "2020-08-05T08:52:20.432Z",
    //           "path": "User/janelane/my-app/cypress/screenshots/spec.js/test (failed).png",
    //           "height": 720,
    //           "width": 1280
    //         }],
    //         "startedAt": "2020-08-05T08:38:37.589Z",
    //         "duration": 1171,
    //         "videoTimestamp": 4486
    //       }]
    //     }],
    //     "video": "User/janelane/my-app/cypress/videos/abc123.mp4"
    //   }],
    //   "runUrl": "https://dashboard.cypress.io/projects/def456/runs/12",
    //   "startedTestsAt": "2018-07-11T17:53:35.463Z",
    //   "totalDuration": 212,
    //   "totalFailed": 1,
    //   "totalPassed": 0,
    //   "totalPending": 0,
    //   "totalSkipped": 0,
    //   "totalSuites": 1,
    //   "totalTests": 1,
    // } */
