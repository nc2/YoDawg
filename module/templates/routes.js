(function () {
    'use strict';

    angular
        .module('<%= module %>')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: '<%= utils.lowerCamelName(utils.rootName(module)) %>',
                config: {
                    url: '/<%= utils.lowerCamelName(utils.rootName(module)) %>',
                    templateUrl: 'app/<%= utils.lowerCamelName(utils.rootName(module)) %>/<%= utils.lowerCamelName(utils.rootName(module)) %>.view.html',
                    controller: '<%= utils.upperName(utils.rootName(module)) %>Controller',
                    controllerAs: 'vm',
                    title: '<%= utils.rootName(module) %>',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> <%= utils.rootName(module) %>'
                    }
                }
            }
        ];
    }
}());
