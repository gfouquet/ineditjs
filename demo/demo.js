require.config({
  shim: {},
  paths: {
    jquery: "../bower_components/jquery/jquery",
    requirejs: "../bower_components/requirejs/require"
  },
  packages: []
});
require(["jquery", "../lib/inedit.js"], function ($) {
  $(document).on("inedit:validate", function (event, data) {
    console.log("validating", arguments);
    data.state.resolve();
  });
});