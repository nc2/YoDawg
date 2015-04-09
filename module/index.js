'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var program = require('ast-query');
var ngAddDep = require('ng-add-dep');
var utils = require('../utils');
var genBase = require('../script-base');

var Generator = module.exports = genBase.extend();

function getParentModule (appPath, conventions) {
  var searchPath = appPath;
  if (conventions) {
    searchPath = _.map(conventions, function (module) {
      return path.join(appPath, module);
    });
  }
  return utils.findModuleFile(searchPath);
}

function addModuleDependency (moduleFile, dependency) {
  var contents = fs.readFileSync(moduleFile, 'utf8');
  var updated = ngAddDep(contents, dependency);

  fs.writeFileSync(moduleFile, updated);
}

// NOTE: This only works with ES5
function addModuleDependencyViaAST (moduleFile, dependency) {
  var contents = fs.readFileSync(moduleFile, 'utf8');

  // generate the AST
  var tree = program(contents);
  var call = tree.callExpression('angular.module');
  var dependencies = call.arguments.at(1);

  // find the dependency to see if it's already added
  var found;
  for (var i = 0; i < dependencies.nodes[0].elements.length; i++) {
    var node = dependencies.at(i);
    if (node.value() === dependency) {
      found = true;
      break;
    }
  }

  // add the dependency to the end of the list if not
  if (!found) {
    dependencies.push("'" + dependency + "'");
  }

  // update the file
  console.log(tree.toString());
}

function fileName (context, type) {
  return context.hyphenatedModule + type + '.' + context.scriptExt;
}

Generator.prototype.initialize = function initialize () {
  this.module = utils.cleanModuleName(this.name);
  this.modulePath = this.getModulePath(this.module);
};

Generator.prototype.writing = function writing () {
  this.hyphenatedModule = utils.hyphenName(this.module);
  this.lowerModule = utils.lowerName(this.module);
  this.scriptExt = 'js';

  // create a new module directory (if it doesn't exist)
  mkdirp.sync(this.modulePath);

  // create module file
  // this.createCodeFile('module', 'js');
  this.fs.copyTpl(
    this.templatePath('module.' + this.scriptExt),
    path.join(this.modulePath, fileName(this, '.module')),
    this
  );

  // create route file
  this.fs.copyTpl(
    this.templatePath('module-routes.' + this.scriptExt),
    path.join(this.modulePath, fileName(this, '.routes')),
    this
    // { utils: utils, moduleName: this.lowerModule }
  );

  // update {index,app}.js with dependency on this module
  var parentModuleFile = getParentModule(this.appPath, ['index', 'app']);
  addModuleDependency(parentModuleFile, this.lowerModule);
};

Generator.prototype.end = function end () {
  this.config.set('lastModule', this.module);
};
