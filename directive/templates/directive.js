(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name <%= module %>.directive:<%= utils.lowerCamelName(name) %>
     * @restrict EA
     * @element
     *
     * @description
     *
     * @example
      <example module="<%= module %>">
        <file name="index.html">
         <<%= utils.hyphenName(name) %>></<%= utils.hyphenName(name) %>>
        </file>
      </example>
     *
     */

    angular
        .module('<%= module %>')
        .directive('<%= utils.lowerCamelName(name) %>', <%= utils.lowerCamelName(name) %>);

    function <%= utils.lowerCamelName(name) %>() {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: '<%= templateUrl %>',
            replace: false,
            controllerAs: 'vm',
            controller: <%= utils.upperName(name) %>Controller,
            link: function (scope, element, attrs) {
                /*jshint unused:false */
                /*eslint "no-unused-vars": [2, {"args": "none"}]*/
            }
        };

        /* @ngInject */
        function <%= utils.upperName(name) %>Controller() {
            var vm = this;
            vm.name = '<%= utils.lowerCamelName(name) %>';
        }

        return directive;
    }
}());
