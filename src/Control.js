function Control(ind, $el, options) {
  this.ind = ind;
  this.$el = $el;
  this.options = $.extend({}, options);
}

Control.prototype.initialize = function () {
  console.log("initialize control", this.options.type);
};

Control.prototype.edit = function () {
  console.log("edit control", this.options.type);
};

Control.prototype.cancel = function () {
  console.log("cancel control", this.options.type);
};

Control.prototype.validate = function () {
  console.log("validate control", this.options.type);
};

Control.prototype.remove = function () {
  console.log("remove control", this.options.type);
};

Control.prototype.show = function () {
  console.log("show control", this.options.type);
};

Control.prototype.hide = function () {
  console.log("hide control", this.options.type);
};

Control.extend = function (proto) {
  var parent = this;
  var child = function () {
    return Control.apply(this, arguments);
  };
  child.prototype = $.extend(child.prototype, Control.prototype, proto);

  return child;
};