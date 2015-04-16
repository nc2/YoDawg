(function() {
  'use strict';

  angular
      .module('<%= module %>')
      .controller('<%= utils.upperName(name) %>', <%= utils.upperName(name) %>);

  /* @ngInject */
  function <%= utils.upperName(name) %> () {
      var vm = this;
      vm.<%= utils.lowerCamelName(name) %> = {};
      vm.<%= utils.lowerCamelName(name) %>.ctrlName = '<%= utils.upperName(name) %>';
  }
}());
