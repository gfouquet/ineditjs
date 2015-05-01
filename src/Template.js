function compileTpl(tpl) {
  return function (params) {
    var acc = tpl;
    $.each(params, function (name, value) {
      acc = acc.replace(new RegExp("\\{\\{" + name + "\\}\\}", "g"), value);
    });

    return acc;
  };
}

var viewTpl = compileTpl("<{{el}} class='ind-view {{class}}'>{{label}}</{{el}}>");
var btnTpl = compileTpl("<input type='button' class='ind-btn ind-btn-{{type}}' value='{{label}}' />");

function makeBtn(type, config) {
  return function () {
    var configType = typeof config;

    if (configType === undefined) return undefined;
    if (configType === "string") return btnTpl({ type: type, label: config });

    throw "Button '" + type + "' with config '" + config + " of type '" + configType + "' not supported";
  };
}

function Template(options) {
  this.options = options;
  this.ok = makeBtn("ok", this.options.ok);
  this.cancel = makeBtn("cancel", this.options.cancel);
  console.log("template options", options);
}

Template.prototype.view = function (label) {
  return viewTpl({ label: label, el: this.options.viewEl, class: this.options.viewClass });
};


