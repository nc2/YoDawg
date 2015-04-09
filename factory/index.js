(function() {
  "use strict";

  var base = require('../script-base');
  var utils = require('../utils');

  var Generator = module.exports = base.extend();

  Generator.prototype.prompting = function prompting() {
    this.askForModuleName();
  };

  Generator.prototype.writing = function writing() {
    // TODO: support ES6
    this.createCodeFile('factory', 'js');
    this.createUnitTest('factory', 'js');
  };

}());
