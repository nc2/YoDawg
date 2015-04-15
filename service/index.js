(function() {
  "use strict";

  var scriptBase = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = scriptBase.extend();

  Generator.prototype.promptName = function prompting () {
      this.askForName(this.name, normalizeName);
  };

  Generator.prototype.promptModule = function prompting () {
      this.askForModuleName();
  };

  Generator.prototype.writing = function writing() {
    this.createCodeFile('service', 'js');
    this.createUnitTest('service', 'js');
  };

  function normalizeName (name) {
      if (!name) return;
      // Service names should never begin with a '$'
      // Services should use upper camel since they're ctor functions
      return utils.upperName(name.replace(/^\$/i, ''));
  }

}());
