(function() {
  "use strict";

  var base = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = base.extend();

  Generator.prototype.promptName = function prompting () {
      this.askForName(this.name, normalizeName);
  };

  Generator.prototype.promptModule = function prompting () {
      this.askForModuleName();
  };

  Generator.prototype.writing = function writing() {
    this.createCodeFile('factory', 'js');
    this.createUnitTest('factory', 'js');
  };

  function normalizeName (name) {
      if (!name) return;
      // Factory names should never begin with a '$'
      return utils.lowerCamelName(name.replace(/^\$/i, ''));
  }

}());
