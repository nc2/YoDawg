'use strict';

var path = require('path');
var exports = module.exports;

function requireFile (config, fileName) {
  return require(path.join(path.dirname(config.path), fileName));
}

exports.getPackage = function getPackage (config) {
  return this.pkg || (this.pkg = requireFile(config, 'package.json'));
};

exports.getGeneratorConfig = function getGeneratorConfig (config) {
  return this.genConfig || (this.genConfig = requireFile(config, '.yo-rc.json'))['generator-gulp-angular'].props;
};

exports.getAppName = function getAppName (config) {
  return this.getPackage(config).name;
};

exports.getPaths = function getPaths (config) {
  return this.getGeneratorConfig(config).paths;
};

exports.getAppDir = function getAppDir (config) {
  // Since we scaffolded with 'gulp-angular', we need to get it from
  // those config files.
  return this.getGeneratorConfig(config).paths.src;
};

exports.getDefaultScriptType = function getDefaultScriptType (config) {
  return this.getGeneratorConfig(config).jsPreprocessor.srcExtension;
};
