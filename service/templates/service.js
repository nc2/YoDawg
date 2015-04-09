(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= utils.lowerName(module) %>.factory:<%= utils.upperName(name) %>
   *
   * @description
   *
   */
  angular
    .module('<%= utils.lowerName(module) %>')
    .factory('<%= utils.upperName(name) %>', <%= utils.upperName(name) %>);

  /* @ngInject */
  function <%= utils.upperName(name) %> () {
    var someValue = '<%= utils.upperName(name) %>';
    var service = {
      someValue: someValue,
      someMethod: someMethod
    };
    return service;

    ///////////

    function someMethod () {
      return '<%= utils.upperName(name) %>';
    };
  }
}());
