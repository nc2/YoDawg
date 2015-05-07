(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Dashboard', function() {
        var controller;

        describe('Controller: DashboardController', function() {
            beforeEach(module('app.dashboard'));
            beforeEach(setup);

            it('Should be created successfully', function () {
                expect(controller).not.to.be.null;
            });
        });

        function setup() {
            bard.inject(this, '$controller', '$rootScope');
            controller = $controller('DashboardController');
        }
    });
}());
