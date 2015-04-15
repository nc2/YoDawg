(function() {
  "use strict";

  var _s = require('underscore.string');
  var base = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = base.extend();

  Generator.prototype.promptName = function prompting () {
      this.askForName(this.name, normalizeName);
  };

  Generator.prototype.promptModule = function prompting () {
      this.askForModuleName();
  };

  Generator.prototype.writing = function writing () {
    this.createCodeFile('controller', 'js');
    this.createUnitTest('controller', 'js');
  };

  function normalizeName (name) {
      if (!name) return;
      return utils.upperName(name.replace(/controller|ctrl$/i, '') + 'Controller');
  }

}());
