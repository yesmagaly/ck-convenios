module.exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'spec.js',
    'agreement/**.spec.js',
    // 'institution/**.spec.js',
  ],

  framework: 'jasmine2',

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',
      displayFailuresSummary: true,
      displayFailedSpec: true,
      displaySuiteNumber: true,
      displaySpecDuration: true
    }));
  }
};
