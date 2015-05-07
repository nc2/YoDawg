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
      // assign a template url
      this.templateUrl = this.moduleDir(this.module) + '/' + utils.lowerCamelName(utils.rootName(this.module)) + '.directive.html';
      this.createCodeFile('directive', 'html');
      this.createCodeFile('directive', 'js');
      this.createUnitTest('directive', 'js');
  };

  function normalizeName (name) {
      if (!name) return;
      return utils.upperName(name.replace(/directive$/i, ''));
  }

}());
