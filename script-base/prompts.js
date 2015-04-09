'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var path = require('path');
var utils = require('../utils');

function logChoice(prompt, prop) {
  var choice = _.findWhere(prompt.choices, {value: prop});
  this.log('\t*', choice.name);
}

module.exports = function (Generator) {

  Generator.prototype.askForModuleName = function askForModuleName (params) {
    var done = this.async();

    this.checkForUpdates();

    this.prompt({
      type: 'input',
      name: 'module',
      message: 'Which module is this for?',
      default: this.config.get('lastModule') || 'components'
    }, function (props) {
      this.module = utils.cleanModuleName(props.module);
      this.config.set('lastModule', this.module);

      done();
    }.bind(this));
  };

  Generator.prototype.askForScriptType = function askForScriptType (params) {
    var done = this.async();

    this.prompt([{
      type: 'input',
      name: 'scriptType',
      message: 'Which script type would you like to generate?',
      default: ''
    }], function (answers) {

    })
  };

};
