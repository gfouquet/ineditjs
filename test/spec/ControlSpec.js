define(["jquery", "Control"], function ($, Control) {
  "use strict";

  describe("Control", function () {
    var $el;

    beforeEach(function () {
      $("body").append($("<input id='ind-text' type='text' />"));
      $el = $("#ind-text");
    });

    afterEach(function () {
      $el.remove();
    });


    it("should get the input's value", function () {
      // given an input with a value
      $el.attr("value", "batman");

      // when
      var ctrl = new Control({}, $el);

      // then
      expect(ctrl.value()).toBe("batman");

      // and when user types new value
      $el.attr("value", "robin");

      // then
      expect(ctrl.value()).toBe("robin");

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
      expect(extProto.apply).toBeDefined();
    });

    it("should have default methods", function () {
      var extended = Control.extend({});
      var inst = new extended();

      expect(inst.initialize).toBeDefined();
      expect(inst.edit).toBeDefined();
      expect(inst.cancel).toBeDefined();
      expect(inst.validate).toBeDefined();
      expect(inst.remove).toBeDefined();
      expect(inst.apply).toBeDefined();
    });
  });
});