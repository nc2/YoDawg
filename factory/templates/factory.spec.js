(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.rootName(module) %>', function () {
        var factory;

        describe('Factory: <%= utils.upperName(name) %>', function () {
            beforeEach(module('<%= module %>'));
            beforeEach(setup);

            it('should have someValue be equal to <%= utils.upperName(name) %>', function () {
                expect(factory.someValue).to.equal('<%= utils.upperName(name) %>');
            });
        });

        function setup() {
            bard.inject(this, '<%= utils.lowerCamelName(name) %>');
            factory = <%= utils.lowerCamelName(name) %>;
        }
    });
}());
