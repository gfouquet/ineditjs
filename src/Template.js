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

function makeBtn(type, widgetId, config) {
  return function () {
    var configType = typeof config;

    if (configType === undefined) return undefined;
    if (configType === "string") return btnTpl({ type: type, widgetId: widgetId, label: config });

    throw "Button '" + type + "' with config '" + config + " of type '" + configType + "' not supported";
  };
}

function Template(widgetId, options) {
  this.options = $.extend({ widgetId: widgetId }, options);
  this.ok = makeBtn("ok", widgetId, this.options.ok);
  this.cancel = makeBtn("cancel", widgetId, this.options.cancel);
  console.log("template options", options);
}

Template.prototype.view = function (label) {
  return viewTpl({
    label: label,
    el: this.options.viewEl,
    class: this.options.viewClass,
    widgetId: this.options.widgetId
  });
};


