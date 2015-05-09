function compileTpl(tpl) {
  return function (params) {
    var acc = tpl;
    $.each(params, function (name, value) {
      acc = acc.replace(new RegExp("\\{\\{" + name + "\\}\\}", "g"), value);
    });

    return acc;
  };
}

var viewTpl = compileTpl("<{{el}} class='ind-view {{class}}' data-ind-id='{{widgetId}}'>{{label}}</{{el}}>");
var btnTpl = compileTpl("<input type='button' class='ind-btn ind-btn-{{type}}' value='{{label}}' data-ind-id='{{widgetId}}' />");
var spinnerTpl = compileTpl("<img class='ind-spinner {{class}}' src='{{url}}' data-ind-id='{{widgetId}}' />");

/**
 * Builds a function which generates html for an inedit button
 *
 * When `render` is `undefined`, nothing is rendered
 * When `render` is a `String`, this String is used as the button's label
 *
 * @param type "ok"|"cancel"
 * @param widgetId
 * @param render the renderer for the button. Can either be `undefined` or a String
 * @returns {Function} no-arg function which returns the html for a button.
 */
function makeBtn(type, widgetId, render) {
  return function () {
    var configType = typeof render;

    if (configType === "undefined") return undefined;
    if (configType === "string") return btnTpl({ type: type, widgetId: widgetId, label: render });

    throw "Button '" + type + "' with config '" + render + " of type '" + configType + "' not supported";
  };
}

/**
 * This object is responsible for generating the sub-components of an inedit widget
 * @param widgetId
 * @param options the inedit options
 * @constructor
 */
function Template(widgetId, options) {
  this.options = $.extend({ widgetId: widgetId }, options);

  this.ok = makeBtn("ok", widgetId, this.options.ok);
  this.cancel = makeBtn("cancel", widgetId, this.options.cancel);

  console.log("template options", options, this.options);
}

/**
 * Generates the non-editable view
 * @param label
 * @returns {*} The html string for the view
 */
Template.prototype.view = function (label) {
  return viewTpl({
    label: label,
    el: this.options.viewEl,
    class: this.options.viewClass,
    widgetId: this.options.widgetId
  });
};

/**
 * Generates the spinner which shows up when *inedit* is in *validating* state
 * @returns {*}
 */
Template.prototype.spinner = function () {
  return spinnerTpl({
    widgetId: this.options.widgetId,
    class: this.options.spinnerClass,
    url: this.options.spinnerUrl
  });
};


