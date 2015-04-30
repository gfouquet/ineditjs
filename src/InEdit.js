function InEdit(element, options) {
  this.el = element;
  // this.options = $.extend({}, pluginDefaults, options);
  // this._defaults = pluginDefaults;
  // this._name = pluginName;
  this.init();
}

InEdit.VERSION = "<%= version %>";

InEdit.DEFAULTS = {};

InEdit.prototype = {
  init: function () {
    // Place initialization logic here
    // You already have access to the DOM element and
    // the options via the instance, e.g. this.element
    // and this.options
    // you can add more functions like the one below and
    // call them like so: this.yourOtherFunction(this.element, this.options).
    console.log("xD");
  },
  yourOtherFunction: function () {
    // some logic
  }
};
