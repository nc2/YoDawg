(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Admin', function() {
        beforeEach(module('app.admin'));

        var controller,
            scope;

        describe('Controller: AdminController', function() {
            beforeEach(function() {
                bard.inject(this, '$controller', '$rootScope');
            });

            beforeEach(function () {
                controller = $controller('AdminController', {$scope: $rootScope.$new() });
            });

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });
    });
}());
