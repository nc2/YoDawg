'use strict';

var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var ngAddDep = require('ng-add-dep');
var utils = require('../utils');
var base = require('../script-base');

var Generator = module.exports = base.extend();

Generator.prototype.initialize = function initialize () {
  this.module = utils.cleanModuleName(this.name);
  if (this.module.split('.').length < 2) {
    this.env.error("Modules should always have a namespace. (ie, app.core, blocks.logger, ...)");
  }

  this.name = utils.stripNamespace(this.module);

  this.logOption('Module', this.module);
};

Generator.prototype.writing = function writing () {
  var scriptExtension = 'js';

  // create a new module directory (if it doesn't exist)
  var modulePath = this.modulePath();
  mkdirp.sync(modulePath);

  // create module and routes file
  this.createCodeFile('module', scriptExtension);
  this.createCodeFile('routes', scriptExtension);

  // update {index,app}.js with dependency on this module
  var rootModule = findAppModule(this.appPath, ['index', 'app']);
  var contents = ngAddDep(this.fs.read(rootModule), utils.lowerName(this.module));
  this.fs.write(rootModule, contents);
};

Generator.prototype.end = function end () {
  this.config.set('lastModule', this.module);
};

function findAppModule (appPath, conventions) {
  var searchPath = appPath;
  if (conventions) {
    searchPath = _.map(conventions, function (module) {
      return path.join(appPath, module);
    });
  }
  return utils.findModuleFile(searchPath);
}
