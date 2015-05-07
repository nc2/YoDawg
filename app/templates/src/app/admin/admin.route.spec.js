(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('Admin', function () {
        var admin = {
            expected: 'admin',
            view: 'app/admin/admin.html',
            route: '#/admin'
        }

        describe('Routing: Admin', function () {
            beforeEach(module('app.admin', bard.fakeToastr));
            beforeEach(setup);

            it('Should map state admin to url "/admin" ', function() {
                expect($state.href(admin.expected, {})).to.equal(admin.route);
            });

            it('Should map "/admin" route to admin View template', function () {
                expect($state.get(admin.expected).templateUrl).to.equal(admin.view);
            });

            it('Should work with $state.go', function () {
                $state.go(admin.expected);
                $rootScope.$apply();
                expect($state.is(admin.route));
            });
        });

        function setup() {
            bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
            $templateCache.put(admin.view, '');
        }
    });
}());
