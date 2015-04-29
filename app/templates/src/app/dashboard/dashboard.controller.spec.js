(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Dashboard', function() {
        beforeEach(module('app.dashboard'));

        var controller;

        describe('Controller: DashboardController', function() {
            beforeEach(function() {
                bard.inject(this, '$controller', '$rootScope');
            });

            beforeEach(function () {
                controller = $controller('DashboardController');
            });

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });
    });
}());
