define(['jquery'], function ($) {

  console.log("yolo")
  describe('just checking', function () {

    it('works for app', function () {
      var el = $('<div></div>');

      el.append('require.js up and running');

      console.log("yololololo")

      expect(el.text()).toEqual('require.js up and running');
    });


  });

});

