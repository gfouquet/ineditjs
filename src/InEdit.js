var widgetCount = 0;

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

function InEdit(el, options) {
  this.el = el;
  this.$el = $(el);
  this.options = $.extend({}, options);
  this.widgetId = "ind-" + (++widgetCount);
  this.$el.attr("data-ind-id", this.widgetId);
  this.tpl = new Template(this.widgetId, tplOpts(this.options));
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
  disabled: false
};

function indIdSelector(ind) {
  return "[data-ind-id=" + ind.widgetId + "]";
}

InEdit.prototype.initialize = function () {
  console.log(this.$el);

  this.$el.after(this.tpl.view(escapeHtml(this.$el.val())))
    .after(this.tpl.ok())
    .after(this.tpl.cancel())
    .after(this.tpl.spinner());

  var sel = indIdSelector(this);
  // TODO no real need to cache, slap this in subelems with an 'or' $ selector
  this.$view = $(".ind-view" + sel);
  this.$ok = $(".ind-btn-ok" + sel);
  this.$cancel = $(".ind-btn-cancel" + sel);
  this.$spinner = $(".ind-spinner" + sel);
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
  this.subelems().forEach(function ($item) {
    $item.removeClass("editing validating");
  });
};

InEdit.prototype.rollback = function () {
  this.cancel.apply(this, arguments);
};

InEdit.prototype.commit = function () {
  var newValue = this.$el.val();
  var previousValue = this.$el.attr("value");
  this.$el.attr("value", newValue);
  this.$view.remove();
  this.$el.after(this.tpl.view(escapeHtml(newValue)));

  this.$view = $(".ind-view" + indIdSelector(this));

  this.subelems().forEach(function ($item) {
    $item.removeClass("validating");
  });

  this.$el.trigger("inedit:commit", {
    source: arguments[0],
    widget: this,
    widgetId: this.widgetId,
    value: newValue,
    previous: previousValue
  });
};
