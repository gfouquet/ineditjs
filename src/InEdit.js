var widgetCount = 0;

function InEdit(el, options) {
  this.el = el;
  this.$el = $(el);
  this.options = options;
  this.widgetId = "ind-" + ++widgetCount;
  this.$el.attr("data-ind-id", this.widgetId);
  this.tpl = new Template(this.widgetId, this.options);
  this.initialize();
  console.log("widgetId", this.widgetId);
}

InEdit.VERSION = "<%= version %>";

InEdit.DEFAULTS = {
  ok: "ok",
  cancel: "cancel",
  viewEl: "span",
  viewClass: ""
};

InEdit.prototype.initialize = function () {
  console.log(this.$el);

  this.$el.after(this.tpl.view(this.$el.val()))
    .after(this.tpl.ok())
    .after(this.tpl.cancel());

  var idSelector = "[data-ind-id=" + this.widgetId + "]";
  this.$view = $(".ind-view" + idSelector);
  this.$ok = $(".ind-btn-ok" + idSelector);
  this.$cancel = $(".ind-btn-cancel" + idSelector);
};

InEdit.prototype.edit = function (event) {
  console.log("edit", arguments);
  [this.$view, this.$ok, this.$cancel, this.$el].forEach(function ($item) {
    $item.addClass("editing");
  });
}

InEdit.prototype.submit = function (event) {
  console.log("submit", arguments);
  this.$el.attr("value", this.$el.val());
  this.$view.remove();
  this.$el.after(this.tpl.view(this.$el.val()));
  var idSelector = "[data-ind-id=" + this.widgetId + "]";
  this.$view = $(".ind-view" + idSelector);
  [this.$view, this.$ok, this.$cancel, this.$el].forEach(function ($item) {
    $item.removeClass("editing");
  });
}

InEdit.prototype.cancel = function (event) {
  console.log("cancel", arguments);
  this.$el.val(this.$el.attr("value"));
  [this.$view, this.$ok, this.$cancel, this.$el].forEach(function ($item) {
    $item.removeClass("editing");
  });
}
