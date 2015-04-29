(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.rootName(module) %>', function () {
        beforeEach(module('<%= module %>'));

        var controller,
            scope;

        describe('Controller: <%= utils.upperName(name) %>', function() {
            beforeEach(function() {
                bard.inject(this, '$controller', '$rootScope');
            });

            beforeEach(function () {
                scope = $rootScope.$new();
                controller = $controller('<%= utils.upperName(name) %>', {$scope: scope });
            });

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });

            it('Should have ctrlName as <%= utils.upperName(name) %>', function () {
              expect(controller.<%= utils.lowerCamelName(name) %>.ctrlName).to.equal('<%= utils.upperName(name) %>');
            });
        });
    });
}());
