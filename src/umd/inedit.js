// Module definition from https://github.com/umdjs/umd
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  "use strict";

  // @include ../Template.js
  // @include ../InEdit.js
  // @include ../plugin.js
  // @include ../api.js

}));