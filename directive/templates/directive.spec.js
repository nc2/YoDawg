(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.rootName(module) %>',function () {
        var markup,
            element,
            scope;

        describe('Directive: <%= utils.hyphenName(name) %>', function () {
            beforeEach(module('<%= module %>'));
            beforeEach(setup);

            beforeEach(function () {
                scope = $rootScope.$new();
                element = $compile(angular.element(markup))(scope);
                scope.$digest();
            });

            it('Should have correct text', function () {
                scope.$apply();
                expect(element.length).to.equal(1);
            });
        });

        function setup() {
            bard.inject(this, '$compile', '$rootScope', '$templateCache');
            markup = '<<%= utils.hyphenName(name) %>></<%= utils.hyphenName(name) %>>';
            $templateCache.put('<%= templateUrl %>', '');
        }
    });
}());
