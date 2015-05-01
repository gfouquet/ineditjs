// The jquery plugin.
function Plugin(config) {
  return this.each(function () {
    var $this = $(this);
    var inst = $this.data("ind.inst");
    var options = $.extend({}, InEdit.DEFAULTS, $this.data(), typeof config === "object" && config);

    if (!inst) $this.data("ind-inst", new InEdit(this, options));

    if (typeof options === "string") inst[options].apply(inst);
  });
}

$.fn.inedit = Plugin;
$.fn.inedit.Constructor = InEdit;