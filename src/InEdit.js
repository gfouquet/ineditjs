var widgetCount = 0;

var viewCoercers = {};

var controlTypes = {};

var SUBELEMS = ".inedit, .ind-view, .ind-spinner, .ind-btn-ok, .ind-btn-cancel";

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

function InEdit(el, options) {
  this.$el = $(el);
  this.options = $.extend({ type: this.$el.attr("type") }, options);
  this.widgetId = "ind-" + (++widgetCount);
  this.$el.addClass("inedit")
    .attr("data-ind-id", this.widgetId);
  this.tpl = new Template(this.widgetId, tplOpts(this.options));
  console.log("coercer", this.options.type || "native")
  this.coerce = viewCoercers[this.options.type || "native"] || viewCoercers.native;
  console.log("type", this.options.type || "native")
  this.type = controlTypes[this.options.type || "native"] || controlTypes.native;
  this.control = new this.type(this, this.$el, this.options);
  this.initialize();

  console.log("widgetId", this.widgetId);
}

InEdit.VERSION = "<%= version %>";

InEdit.DEFAULTS = {
  ok: "ok",
  cancel: "cancel",
  viewEl: "span",
  viewClass: "",
  viewEmptyClass: "text-muted",
  spinnerUrl: "spinner.gif", // http://preloaders.net/en/circular/2
  spinnerClass: "",
  async: true,
  disabled: false,
  viewPlaceholder: "Click to edit..."
};

InEdit.coercers = function () {
  return $.extend({}, viewCoercers);
};

InEdit.coercer = function (name) {
  return viewCoercers[name];
};

InEdit.coerce = function (name, coercer) {
  viewCoercers[name] = coercer;
};

InEdit.control = function(name, prototype) {
  controlTypes[name] = Control.extend(prototype);
};

InEdit.prototype.initialize = function () {
  this.control.initialize();

  this.$el.after(this.tpl.view())
    .after(this.tpl.ok())
    .after(this.tpl.cancel())
    .after(this.tpl.spinner());
  this.renderView();
};

InEdit.prototype.$ = function (selector) {
  return $(indIdSelector(this)).filter(selector);
};

InEdit.prototype.renderView = function () {
  var html = buildView(this);
  var $container = this.$(".ind-view");
  if (!html || html === "") {
    html = this.options.viewPlaceholder;
    $container.addClass(this.options.viewEmptyClass);
  } else {
    $container.removeClass(this.options.viewEmptyClass);
  }
  $container.html(html);
  return this;
};

InEdit.prototype.edit = function (event) {
  console.log("edit", arguments);
  this.$(SUBELEMS).addClass("editing");
};

InEdit.prototype.submit = function (event) {
  console.log("submit", arguments);

  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");

  this.$(SUBELEMS).addClass("validating")
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
  this.$(SUBELEMS).removeClass("editing validating");
};

InEdit.prototype.rollback = function () {
  this.cancel.apply(this, arguments);
};

InEdit.prototype.commit = function () {
  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");
  this.$el.attr("value", newValue);
  this.renderView();

  this.$(SUBELEMS).removeClass("validating");

  this.$el.trigger("inedit:commit", {
    source: arguments[0],
    widget: this,
    widgetId: this.widgetId,
    value: newValue,
    previous: previousValue
  });
};

/**
 * Removes inedit functionality from this object's targeted element
 */
InEdit.prototype.remove = function () {
  this.$(".ind-view, .ind-spinner, .ind-btn-ok, .ind-btn-cancel").remove();
  this.$el.removeClass("inedit").removeAttr("data-ind-id");
};

// Initialize InEdit
InEdit.coerce("native", function (value, options) {
  return escapeHtml(value);
});

function localDateTimeCoercer(format) {
  if (!localDateTimeCoercer.timeZonePostfix) {
    var off = new Date().getTimezoneOffset();
    var sign = off < 0 ? "+" : "-";
    off = Math.abs(off);
    var hrs = Math.floor(off * 100 / 60);
    var min = off % 60;
    localDateTimeCoercer.timeZonePostfix = sign + (hrs > 9 ? "0" : "") + (hrs + min);
  }

  return function (value, options) {
    if (!value || value === "") return undefined;

    return format(new Date(value + localDateTimeCoercer.timeZonePostfix));
  };
}
InEdit.coerce("date", localDateTimeCoercer(function (date) {
  return date.toLocaleDateString(navigator.language);
}));
InEdit.coerce("datetime-local", localDateTimeCoercer(function (date) {
  return date.toLocaleString(navigator.language);
}));

InEdit.control("native", {});