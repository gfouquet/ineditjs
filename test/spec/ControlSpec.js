define(["jquery", "Control"], function ($, Control) {
  describe("Control", function () {
    it("should remove inedit data from its $el", function () {
      $("body").append($("<input id='ind-text' type='text' class='inedit' data-ind-id = 'indid' />"));
      var $el = $("#ind-text");

      var ctrl = new Control({}, $el);
      ctrl.remove();

      expect($el.hasClass("inedit")).toBeFalsy();
      expect($el.attr("data-ind-id")).toBeUndefined();
    });
  });

  describe("Extended Control", function () {
    it("should have default prototype methods", function () {
      var extended = Control.extend({});
      var extProto = extended.prototype;

      expect(extProto.initialize).toBeDefined();
      expect(extProto.edit).toBeDefined();
      expect(extProto.cancel).toBeDefined();
      expect(extProto.validate).toBeDefined();
      expect(extProto.remove).toBeDefined();
      expect(extProto.hide).toBeDefined();
    });

    it("should have default methods", function () {
      var extended = Control.extend({});
      var inst = new extended();

      expect(inst.initialize).toBeDefined();
      expect(inst.edit).toBeDefined();
      expect(inst.cancel).toBeDefined();
      expect(inst.validate).toBeDefined();
      expect(inst.remove).toBeDefined();
      expect(inst.hide).toBeDefined();
    });
  });
});