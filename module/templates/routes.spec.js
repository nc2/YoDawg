(function() {
    'use strict';

    /* jshint -W117, -W030 */
    describe('<%= utils.rootName(module) %>', function () {
        var route = {
            expected: '<%= utils.lowerCamelName(utils.rootName(module)) %>',
            view: 'app/<%= utils.lowerCamelName(utils.rootName(module)) %>/<%= utils.lowerCamelName(utils.rootName(module)) %>.view.html',
            route: '#/<%= utils.lowerCamelName(utils.rootName(module)) %>'
        }

        describe('Routing: <%= utils.upperName(utils.rootName(module)) %>', function () {
            beforeEach(module('<%= module %>', bard.fakeToastr));
            beforeEach(setup);

            it('Should map state <%= utils.lowerCamelName(utils.rootName(module)) %> to url "/<%= utils.lowerCamelName(utils.rootName(module)) %>" ', function() {
                expect($state.href(route.expected, {})).to.equal(route.route);
            });

            it('Should map "/<%= utils.lowerCamelName(utils.rootName(module)) %>" route to <%= utils.lowerCamelName(utils.rootName(module)) %> View template', function () {
                expect($state.get(route.expected).templateUrl).to.equal(route.view);
            });

            it('Should work with $state.go', function () {
                $state.go(route.expected);
                $rootScope.$apply();
                expect($state.is(route.route));
            });
        });

        function setup() {
            bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
            $templateCache.put(route.view, '');
        }
    });
}());
