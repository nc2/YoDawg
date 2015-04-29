(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Layout', function() {
        beforeEach(module('app.layout'));

        var controller,
            scope;

        describe('Controller: ShellController', function() {
            beforeEach(function() {
                bard.inject(this, '$controller', '$rootScope');
            });

            beforeEach(function () {
                controller = $controller('ShellController', {$scope: $rootScope.$new() });
            });

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });
    });
}());
