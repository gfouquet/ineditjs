// The jquery plugin.
function Plugin(config) {
  return this.each(function () {
    var $this = $(this);
    var inst = $this.data("ind-inst");
    var options = $.extend(
      {},
      InEdit.DEFAULTS,
      { disabled: $this.prop("disabled") },
      $this.data(),
      typeof config === "object" && config);

    if (!inst) {
      inst = new InEdit(this, options);
      $this.data("ind-inst", inst);

      $this.on("removed", function() {
        inst.remove();
        $this.off("removed");
      });
    }

    if (typeof config === "string") inst[config].apply(inst);
  });
}

$.fn.inedit = Plugin;
$.fn.inedit.Constructor = InEdit;

$.event.special.removed = {
  remove: function(o) {
    if (o.handler && o.type !== "removed") o.handler();
  }
};
