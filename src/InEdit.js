var widgetCount = 0;

var viewCoercers = {};

/**
 * Builds the options to pass to a Template from an *inedit*'s options
 * @param widgetOpts
 * @returns {*}
 */
function tplOpts(widgetOpts) {
  var opts = $.extend({}, widgetOpts);
  if (opts.disabled) {
    opts.viewClass = opts.viewClass + " ind-static";
    opts.ok = undefined;
    opts.cancel = undefined;
  }
  return opts;
}

function escapeHtml(s) {
  return $("<div></div>").text(s).html();
}

function indIdSelector(ind) {
  return "[data-ind-id='" + ind.widgetId + "']";
}

function buildView(ind) {
  return ind.coerce(ind.$el.val(), ind.options);
}

function $subelems(ind) {
  var idSel = indIdSelector(ind);
  return $(".inedit" + idSel + ", .ind-view" + idSel +
    ", .ind-btn-ok" + idSel + ", .ind-btn-cancel" + idSel +
    ", .ind-spinner" + idSel);
}

function InEdit(el, options) {
  this.$el = $(el);
  this.options = $.extend({}, options);
  this.widgetId = "ind-" + (++widgetCount);
  this.$el.addClass("inedit")
    .attr("data-ind-id", this.widgetId);
  this.tpl = new Template(this.widgetId, tplOpts(this.options));
  this.coerce = viewCoercers.native;
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
  async: true,
  disabled: false,
  viewPlaceholder: "Click to edit..."
};

InEdit.coerce = function (name, coercer) {
  viewCoercers[name] = coercer;
};

InEdit.prototype.initialize = function () {
  // console.log(this.$el);
  console.log("ok", this.tpl.ok())
  console.log("opts", this.options)

  this.$el.after(this.tpl.view(buildView(this)))
    .after(this.tpl.ok())
    .after(this.tpl.cancel())
    .after(this.tpl.spinner());
};

InEdit.prototype.$ = function (selector) {
  return $(indIdSelector(this)).filter(selector);
};

InEdit.prototype.renderView = function () {
  this.$(".ind-view").html(buildView(this));
  return this;
};

InEdit.prototype.edit = function (event) {
  console.log("edit", arguments);
  $subelems(this).addClass("editing");
};

InEdit.prototype.submit = function (event) {
  console.log("submit", arguments);

  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");

  $subelems(this).addClass("validating")
    .removeClass("editing");

  if (this.options.async === true) {
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
  } else {
    this.commit(event);
  }

};

InEdit.prototype.cancel = function (event) {
  console.log("cancel", arguments);
  this.$el.val(this.$el.attr("value"));
  $subelems(this).removeClass("editing validating");
};

InEdit.prototype.rollback = function () {
  this.cancel.apply(this, arguments);
};

InEdit.prototype.commit = function () {
  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");
  this.$el.attr("value", newValue);
  this.renderView();

  $subelems(this).removeClass("validating");

  this.$el.trigger("inedit:commit", {
    source: arguments[0],
    widget: this,
    widgetId: this.widgetId,
    value: newValue,
    previous: previousValue
  });
};

InEdit.prototype.remove = function () {
  this.$(".ind-view, .ind-spinner, .ind-btn-ok, .ind-btn-cancel").remove();
  this.$el.removeClass("inedit").removeAttr("data-ind-id");
};

// Initialize InEdit
InEdit.coerce("native", function (value, options) {
  return escapeHtml(value);
});

var localeDateTimeCoercer = function (value, options) {
  return (new Date(value)).toLocaleDateString(navigator.language);
};
InEdit.coerce("date", localeDateTimeCoercer);
InEdit.coerce("datetime", localeDateTimeCoercer);
