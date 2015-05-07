(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.rootName(module) %>', function () {
        var service;
        
        describe('Service: <%= utils.upperName(name) %>', function () {
            beforeEach(module('<%= module %>'));
            beforeEach(setup);

            it('Should equal <%= utils.upperName(name) %>', function () {
                expect(service.get()).to.equal('<%= utils.upperName(name) %>');
            });
        });
        
        function setup() {
            bard.inject(this, '<%= utils.upperName(name) %>');
            service = <%= utils.upperName(name) %>;
        }
    });
}());
