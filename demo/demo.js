require.config({
  shim: {
    tinymce: {
      deps: ["jquery"],
      exports: "tinymce"
    }
  },
  paths: {
    jquery: "../bower_components/jquery/jquery",
    requirejs: "../bower_components/requirejs/require",
    polyfiller: "../bower_components/webshim/js-webshim/minified/polyfiller",
    tinymce: "../bower_components/tinymce/tinymce"
  },
  packages: []
});

require(["jquery", "polyfiller", "tinymce", "../lib/inedit.js"], function ($, webshims, tinymce) {
  //webshims.polyfill();

  $(document).on("inedit:validate", function (event, data) {
    console.log("validating", arguments);
    //var id = $()
    $(".companion").data("state", data.state);

  }).on("click", ".companion.validate", function (event) {
    console.log("validate", arguments);
    var state = $(event.currentTarget).data("state");
    if (!!state) state.resolve();

  }).on("click", ".companion.reject", function (event) {
    console.log("reject", arguments);
    var state = $(event.currentTarget).data("state");
    if (!!state) state.reject();

  });

  $.fn.inedit.Constructor.control("tinymce", {
    initialize: function () {
      console.log("init mce");
      // apparently, init is async. We shall return a promise so that the control is hidden when available
      var def = $.Deferred();
      tinymce.on("AddEditor", function (event) {
        console.log("add editor", arguments);
        event.editor.on("init", function (event) {
          this.initialContent = this.getContent();
          def.resolve(this);
        });
      });
      tinymce.init({
        selector: "#tinymce",
        skin_url: "../bower_components/tinymce/skins/lightgray",
        theme_url: "../bower_components/tinymce/themes/modern/theme.js",
        setup: function (ed) {
          ed.on("init", function () {
            console.log("ed inited");
            //ed.hide()
          });
        }
      });
      return def;
    },
    apply: function () {
      tinymce.get("tinymce").hide();
    },
    edit: function () {
      tinymce.get("tinymce").show();
    },
    cancel: function () {
      var ed = tinymce.get("tinymce")
      ed.setContent(ed.initialContent);
      this.apply();
    },
    validate: function () {
    },
    remove: function () {
    }
  });
  console.log("mce");


  $(function () {
    console.log("demo domready");
    $("#tinymce").inedit();
    //window.tinyMCE.init({
    //  selector: "#tinymce",
    //  skin_url: "../bower_components/tinymce/skins/lightgray",
    //  theme_url: "../bower_components/tinymce/themes/modern/theme.js"
    //});
  });
});