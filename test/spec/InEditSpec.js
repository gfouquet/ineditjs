define(["jquery", "InEdit"], function ($, InEdit) {

  describe("InEdit", function () {
    var opts = $.extend({}, InEdit.DEFAULTS);

    describe("initializing", function () {
      var $el;
      var ind;

      beforeEach(function () {
        $("body").append($("<input id='ind-text' type='text' />"));
        $el = $("#ind-text");
      });

      afterEach(function () {
        ind.remove();
        $el.data("ind-inst", undefined)
        $el.remove();
      });

      it("should add .inedit to element", function () {
        ind = new InEdit($el, opts);
        expect($el.hasClass("inedit")).toBeTruthy();
      });

      it("should add data-ind-id to element", function () {
        ind = new InEdit($el, opts);
        expect($el.filter("[data-ind-id]").length).toBe(1);
      });

      it("should create a view", function () {
        ind = new InEdit($el, opts);
        expect($(".ind-view[data-ind-id]").length).toBe(1);
      });

      it("should create an ok button", function () {
        ind = new InEdit($el, opts);
        expect($(".ind-btn.ind-btn-ok[data-ind-id]:button").length).toBe(1);
      });

      it("should create a cancel button", function () {
        ind = new InEdit($el, opts);
        expect($(".ind-btn.ind-btn-cancel[data-ind-id]:button").length).toBe(1);
      });
    });

    describe("destroying", function () {
      it("should remove buttons, spinner and view", function () {
        $("body").append($("<input id='ind-text' type='text' />"));
        var $el = $("#ind-text");
        var ind = new InEdit($el, opts);

        ind.remove();

        expect($("[data-ind-id]").length).toBe(0);
      });
    });

    describe("api", function () {
      it("should select subcomponents", function () {
        $("body").append($("<input id='ind-text' type='text' />"));
        var $el = $("#ind-text");
        var ind = new InEdit($el, opts);
        var id = $el.data("ind-id");

        expect(ind.$(".ind-view").data("ind-id")).toBe(id);
        expect(ind.$(".ind-spinner").data("ind-id")).toBe(id);
        expect(ind.$(".ind-btn-ok").data("ind-id")).toBe(id);
        expect(ind.$(".ind-btn-cancel").data("ind-id")).toBe(id);
      });
    });

  });
});

