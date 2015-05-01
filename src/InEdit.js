function InEdit(el, options) {
  this.el = el;
  this.$el = $(el);
  this.options = options;
  // this.options = $.extend({}, pluginDefaults, options);
  // this._defaults = pluginDefaults;
  // this._name = pluginName;
  this.tpl = new Template(this.options);
  this.initialize();
}

InEdit.VERSION = "<%= version %>";

InEdit.DEFAULTS = {
  ok: "ok",
  cancel: "cancel",
  viewEl: "span",
  viewClass: ""
};

InEdit.prototype.initialize = function () {
  this.template = new Template(this.options);
  console.log(this.$el);

  this.$el.after(this.tpl.view(this.$el.val()))
    .after(this.tpl.ok())
    .after(this.tpl.cancel());
};
