(function() {
    'use strict';

    /*global describe, beforeEach, it, expect, inject, module*/
    describe('<%= utils.lowerCamelName(name) %>', function () {
        var scope, element;

        beforeEach(module('<%= module %>', '<%= templateUrl %>'));

        beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            element = $compile(angular.element('<<%= utils.hyphenName(name) %>></<%= utils.hyphenName(name) %>>'))(scope);
        }));

        it('should have correct text', function () {
            scope.$apply();
            expect(element.isolateScope().<%= utils.lowerCamelName(name) %>.name).toEqual('<%= utils.lowerCamelName(name) %>');
        });
    });
}());
