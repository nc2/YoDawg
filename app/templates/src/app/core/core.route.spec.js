(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Core', function() {
        beforeEach(module('app.core', bard.fakeToastr));

        describe('Routing: Core', function() {
            var fourZeroFour = {
                expected: '404',
                view: 'app/core/404.html',
                route: '404'
            };

            beforeEach(function() {
                bard.inject(this, '$location', '$rootScope', '$state', '$templateCache');
            });

            beforeEach(function() {
                $templateCache.put(fourZeroFour.view, '');
            });

            it('Should map /404 route to 404 View template', function() {
                expect($state.get(fourZeroFour.expected).templateUrl).to.equal(fourZeroFour.view);
            });

            it('Should work with $state.go', function() {
                $state.go(fourZeroFour.expected);
                $rootScope.$apply();
                expect($state.is(fourZeroFour.route));
            });

            it('should route /invalid to the otherwise (404) route', function() {
                $location.path('/qwerty');
                $rootScope.$apply();
                expect($state.is(fourZeroFour.route));
            });
        });
    });
}());
