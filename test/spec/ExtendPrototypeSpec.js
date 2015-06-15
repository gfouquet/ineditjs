define(["jquery"], function ($) {
  describe("Extended prototype", function () {
    var Ctor = function (opt) {
      this.option = opt;
      this.name = "my name";
      this.wrapped = function () {
        return "wrapped" + Ctor.prototype.wrapped.apply(this, arguments);
      };
    };

    it("should add methods to object", function () {

      var extension = {
        added: function () {
          return "added";
        },
        getName: function () {
          return this.name;
        },
        wrapped: function (echoed) {
          return echoed;
        }
      };

      $.extend(Ctor.prototype, extension);

      var subject = new Ctor();

      expect(subject.added()).toBe("added");
      expect(subject.getName()).toBe("my name");
      expect(subject.wrapped("ohé")).toBe("wrappedohé");
    });

    it("should create extended type on the fly", function () {

      var extension = {
        added: function () {
          return "added";
        },
        getName: function () {
          return this.name;
        },
        wrapped: function (echoed) {
          return echoed;
        }
      };

      var Child = function() {
        return Ctor.apply(this, arguments);
      };

      $.extend(Child.prototype, extension);

      var subject = new Child("wizz");

      expect(subject.added()).toBe("added");
      expect(subject.getName()).toBe("my name");
      expect(subject.wrapped("ohé")).toBe("wrappedohé");
      expect(subject.option).toBe("wizz");
    });
  });
});