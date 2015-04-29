(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.lowerCamelName(name) %>', function () {
      var factory;

      beforeEach(module('<%= module %>'));

      beforeEach(inject(function (<%= utils.lowerCamelName(name) %>) {
        factory = <%= utils.lowerCamelName(name) %>;
      }));

      it('should have someValue be <%= utils.upperName(name) %>', function () {
        expect(factory.someValue).toEqual('<%= utils.upperName(name) %>');
      });

      it('should have someMethod return <%= utils.lowerCamelName(name) %>', function () {
        expect(factory.someMethod()).toEqual('<%= utils.lowerCamelName(name) %>');
      });
    });
}());
