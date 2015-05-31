define(["jquery", "InEdit"], function ($, InEdit) {

  describe("InEdit.coercers", function () {
    it("should return copy of internal registry", function () {
      var coercers = InEdit.coercers();
      coercers.native = undefined;
      expect(InEdit.coercers().native).not.toBeUndefined();
    });
  });

  describe("InEdit.coercer", function () {
    it("native should pass-through value", function () {
      var coercer = InEdit.coercer("native");

      expect(coercer("batman")).toBe("batman");
    });

    it("datetime-local should format according to navigator locale and TZ", function () {
      var coercer = InEdit.coercer("datetime-local");

      // This test is deactivated because of issue https://github.com/ariya/phantomjs/issues/10187
      // plus karma wont properly set the locale
      //expect(coercer("2015-01-31T23:50")).toBe("31/01/2015 23:59");
    });

    it("date should format according to navigator locale", function () {
      var coercer = InEdit.coercer("date");

      // This test is deactivated because of issue https://github.com/ariya/phantomjs/issues/10187
      // plus karma wont properly set the locale
      //expect(coercer("2015-01-02")).toBe("02/01/2015");
    });
  });
});