(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.generators = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getGeneratorList()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getGeneratorList() {
            return dataservice.getGeneratorList().then(function (data) {
                vm.generators = data;
                return vm.generators;
            });
        }
    }
})();
