(function() {
  'use strict';

  angular
      .module('<%= module %>')
      .controller('<%= utils.upperName(name) %>', <%= utils.upperName(name) %>);

  /* @ngInject */
  function <%= utils.upperName(name) %> ($scope) {
    $scope.<%= utils.lowerCamelName(name) %> = {};
    $scope.<%= utils.lowerCamelName(name) %>.ctrlName = '<%= utils.upperName(name) %>';
  }
}());
