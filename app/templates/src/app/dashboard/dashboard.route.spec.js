/* jshint -W117, -W030 */
describe('Dashboard', function () {
    describe('Dashboard: Routing', function () {
        var controller,
        dashboard = {
            expected: 'dashboard',
            view: 'app/dashboard/dashboard.html',
            route: '#/'
        };

        beforeEach(module('app.dashboard', bard.fakeToastr));

        beforeEach(function() {
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(dashboard.view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('Should map state dashboard to url / ', function() {
            expect($state.href(dashboard.expected, {})).to.equal(dashboard.route);
        });

        it('Should map /dashboard route to dashboard View template', function () {
            expect($state.get(dashboard.expected).templateUrl).to.equal(dashboard.view);
        });

        it('Should work with $state.go', function () {
            $state.go(dashboard.expected);
            $rootScope.$apply();
            expect($state.is(dashboard.route));
        });
    });
});
