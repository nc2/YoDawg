(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Admin', function() {
        var controller,
            scope;

        describe('Controller: AdminController', function() {
            beforeEach(module('app.admin'));
            beforeEach(setup);

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });

        function setup() {
            bard.inject(this, '$controller', '$rootScope');
            controller = $controller('AdminController', {$scope: $rootScope.$new() });
        }
    });
}());
