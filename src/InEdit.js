var widgetCount = 0;

function InEdit(el, options) {
  this.el = el;
  this.$el = $(el);
  this.options = options;
  this.widgetId = "ind-" + (++widgetCount);
  this.$el.attr("data-ind-id", this.widgetId);
  this.tpl = new Template(this.widgetId, this.options);
  this.rollback = this.rollback.bind(this);
  this.commit = this.commit.bind(this);
  this.initialize();

  console.log("widgetId", this.widgetId);
}

InEdit.VERSION = "<%= version %>";

InEdit.DEFAULTS = {
  ok: "ok",
  cancel: "cancel",
  viewEl: "span",
  viewClass: "",
  spinnerUrl: "spinner.gif", // http://preloaders.net/en/circular/2
  spinnerClass: "",
  async: true
};

InEdit.prototype.initialize = function () {
  console.log(this.$el);

  this.$el.after(this.tpl.view(this.$el.val()))
    .after(this.tpl.ok())
    .after(this.tpl.cancel())
    .after(this.tpl.spinner());

  var idSelector = "[data-ind-id=" + this.widgetId + "]";
  this.$view = $(".ind-view" + idSelector);
  this.$ok = $(".ind-btn-ok" + idSelector);
  this.$cancel = $(".ind-btn-cancel" + idSelector);
  this.$spinner = $(".ind-spinner" + idSelector);
};

InEdit.prototype.subelems = function () {
  return [this.$view, this.$ok, this.$cancel, this.$el, this.$spinner];
};

InEdit.prototype.edit = function (event) {
  console.log("edit", arguments);
  this.subelems().forEach(function ($item) {
    $item.addClass("editing");
  });
};

InEdit.prototype.submit = function (event) {
  console.log("submit", arguments);
  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");

  this.subelems().forEach(function ($item) {
    $item.addClass("validating")
      .removeClass("editing");
  });

  var state = $.Deferred();
  state.done(this.commit.bind(this))
    .fail(this.rollback.bind(this));

  this.$el.trigger("inedit:validate", {
    source: event,
    widget: this,
    widgetId: this.widgetId,
    value: newValue,
    previous: previousValue,
    state: state
  });
};

InEdit.prototype.cancel = function (event) {
  console.log("cancel", arguments);
  this.$el.val(this.$el.attr("value"));
  this.subelems().forEach(function ($item) {
    $item.removeClass("editing");
  });
};

InEdit.prototype.rollback = function () {
  this.cancel.apply(this, arguments);
};

InEdit.prototype.commit = function () {
  this.$el.attr("value", this.$el.val());
  this.$view.remove();
  this.$el.after(this.tpl.view(this.$el.val()));

  var idSelector = "[data-ind-id=" + this.widgetId + "]";
  this.$view = $(".ind-view" + idSelector);

  this.subelems().forEach(function ($item) {
    $item.removeClass("validating");
  });
};
