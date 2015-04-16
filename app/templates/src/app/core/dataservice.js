(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            getGeneratorList: getGeneratorList
        };

        return service;

        function getGeneratorList() {
          return $q.when({
            'structure' : [
                'dawg:app',
                'dawg:module'
            ],
            'frontend' : [
                'dawg:controller',
                'dawg:directive',
                //'dawg:filter',
                //'dawg:decorator'
            ],
            'service' : [
                //'dawg:provider',
                'dawg:factory',
                'dawg:service',
                //'dawg:constant',
                //'dawg:value'
            ]
          });
        }
    }
})();
