(function() {
  "use strict";

  var scriptBase = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = scriptBase.extend();

  Generator.prototype.prompting = function prompting() {
    this.askForModuleName();
  };

  Generator.prototype.writing = function writing() {
    // TODO: support ES6
    this.createCodeFile('service', 'js');
    this.createUnitTest('service', 'js');
  };

}());
