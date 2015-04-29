'use strict';

var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var ngAddDep = require('ng-add-dep');
var utils = require('../utils');
var base = require('../script-base');

var Generator = module.exports = base.extend();

Generator.prototype.prompting = function askForModule () {
    this.askForModuleName(this.name);
};

Generator.prototype.writing = function writing () {
    var scriptExtension = 'js';

    // create a new module directory (if it doesn't exist)
    mkdirp.sync(this.modulePath());

    // create module and routes file
    this.createCodeFile('module', scriptExtension);
    this.createCodeFile('routes', scriptExtension);
    this.createCodeFile('view', 'html');
    this.createUnitTest('routes', scriptExtension);

    // update {index,app}.js with dependency on this module
    var rootModule = findAppModule(this.appPath, ['index', 'app']);
    var contents = ngAddDep(this.fs.read(rootModule), this.module);
    this.fs.write(rootModule, contents);
};

function findAppModule (rootPath, conventions) {
    var searchPath = rootPath;
    if (conventions) {
        searchPath = _.map(conventions, function (module) {
            return path.join(rootPath, module);
        });
    }
    return utils.findModuleFile(searchPath);
}
