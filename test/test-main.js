var allTestFiles = [];
var TEST_REGEXP = /[Ss]pec\.js$/;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

console.log("Test files", allTestFiles);

// There is no Function.bind in phantomjs < 2
// The following shim will do
Function.prototype.bind = function(ctx) {
  var func = this;
  return function() {
    return func.apply(ctx, arguments);
  };
};

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: "/base",
  shim: {
    Template: {
      deps: ["jquery"],
      exports: "Template"
    },
    InEdit: {
      deps: ["jquery", "Template", "Control"],
      exports: "InEdit"
    },
    Control: {
      deps: ["jquery"],
      exports: "Control"
    }
  },
  paths: {
    jquery: "bower_components/jquery/jquery",
    Template: "src/Template",
    InEdit: "src/InEdit",
    Control: "src/Control"
  },
  packages: [],

  // ask Require.js to load these files (all our tests)
  deps: allTestFiles,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
