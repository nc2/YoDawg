'use strict';

var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var updateNotifier = require('update-notifier');

var utils = require('../utils');

var Generator = module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.utils = utils;
    this.pkg = utils.getPackage(this.config);
    this.appName = utils.getAppName(this.config);
    this.appDir = utils.getAppDir(this.config);
    this.appPath = this.destinationPath(this.config.get('dirs').app);

    this.log(chalk.yellow('Using: '));
    this.log(chalk.yellow('\tAppName: ') + this.determineAppname());
    this.log(chalk.yellow('\tGenName: ') + this.name);
    this.log(chalk.yellow('\tTemplates: ') + this.sourceRoot());
  }
});

Generator.prototype.checkForUpdates = function checkForUpdates () {
  var notifier = updateNotifier({
    packageName: this.pkg.name,
    packageVersion: this.pkg.version
  });
  notifier.notify();
};

Generator.prototype.getModulePath = function getModulePath (module) {
  return path.join(this.appPath, module);
};

Generator.prototype.modulePath = function modulePath (filename) {
  var moduleName = this.module || 'components';
  return path.join(this.appPath, moduleName, filename);
};

/**
 * createCodeFile - description
 *
 * @param  {type} type service, module, controller, etc.
 * @param  {type} ext  js, es6, html, etc.
 */
Generator.prototype.createCodeFile = function createCodeFile (type, ext) {
  var name = this.name || this.module;
  this.fs.copyTpl(
    this.templatePath(type + '.' + ext),
    this.modulePath(utils.hyphenName(name) + '.' + type + '.' + ext),
    this
  );
};


/**
 * createCodeFile - description
 *
 * @param  {type} type service, module, controller, etc.
 * @param  {type} ext  js, es6, html, etc.
 */
Generator.prototype.createUnitTest = function createCodeFile (type, ext) {
  var name = this.name || this.module;
  this.fs.copyTpl(
    this.templatePath('spec.' + ext),
    this.modulePath(utils.hyphenName(name) + '.' + type + '.spec.' + ext),
    this
  );
};

Generator.prototype.copySrcFile = function copySrcFile(component) {
  return this.copyFile('src', component);
};

Generator.prototype.copyFile = function copyFile (type, component) {
  var dir = this.appDir; // app directory
  // append module path
  dir = path.join(dir, this.modulePath)
}

require('./prompts.js')(Generator);
