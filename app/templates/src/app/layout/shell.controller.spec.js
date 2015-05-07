(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Layout', function() {
        var controller,
            scope;

        describe('Controller: ShellController', function() {
            beforeEach(module('app.layout'));
            beforeEach(setup);

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });

        function setup() {
            bard.inject(this, '$controller', '$rootScope');
            controller = $controller('ShellController', {$scope: $rootScope.$new() });
        }
    });
}());
