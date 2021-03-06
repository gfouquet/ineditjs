// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-13 using
// generator-karma 1.0.0

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '..',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine",
      "requirejs"
    ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: "bower_components/jquery/jquery.js", included: false },
      { pattern: "test/spec/**/*.js", included: false },
      { pattern: "src/**/*.js", included: false },

      // Only this file is loaded through <script> tag
      { pattern: "test/test-main.js", included: true },

    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS",
      //"PhantomJS_fr"
    ],

    // deactivated for now : https://github.com/karma-runner/karma-phantomjs-launcher/issues/45
    //customLaunchers: {
    //  "PhantomJS_fr": {
    //    base: "PhantomJS",
    //    flags: ["TZ=FR"],
    //   // debug: true
    //  }
    //},

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-requirejs"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
