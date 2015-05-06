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
    //var id = $()
    $(".companion").data("state", data.state);

  }).on("click", ".companion.validate", function(event) {
    console.log("validate", arguments);
    var state = $(event.currentTarget).data("state");
    if(!!state) state.resolve();

  }).on("click", ".companion.reject", function(event) {
    console.log("reject", arguments);
    var state = $(event.currentTarget).data("state");
    if(!!state) state.reject();

  });
});