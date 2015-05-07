(function () {
    'use strict';

    /**
    * @ngdoc service
    * @name <%= module %>.factory:<%= utils.upperName(name) %>
    *
    * @description
    *
    */
    angular
        .module('<%= module %>')
        .factory('<%= utils.lowerCamelName(name) %>', <%= utils.lowerCamelName(name) %>);

    /* @ngInject */
    function <%= utils.lowerCamelName(name) %> () {
        var someValue = '<%= utils.upperName(name) %>';
        var factory = {
            someValue: someValue,
            someMethod: someMethod
        };
        return factory;

        ///////////

        function someMethod () {
            return '<%= utils.lowerCamelName(name) %>';
        };
    }
}());
