(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger) {
        var admin = this;
        admin.title = 'Admin';
        admin.contactForm = {};

        admin.submitContact = function() {
            console.log('awesome');
            logger.success('Way to go!');
        };

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
