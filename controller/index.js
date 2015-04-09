(function() {
  "use strict";

  var _s = require('underscore.string');
  var base = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = base.extend();

  Generator.prototype.initialize = function initialize () {
    this.name = normalizeName(this.name);
  };

  Generator.prototype.prompting = function prompting () {
    this.askForModuleName();
  };

  Generator.prototype.writing = function writing () {
    this.createCodeFile('controller', 'js');
    this.createUnitTest('controller', 'js');
  };

  function normalizeName (name) {
    return utils.upperName(name.replace(/controller|ctrl$/i, '') + 'Controller');
  }

}());
