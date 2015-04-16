'use strict';

var _ = require('underscore.string');

var exports = module.exports;

exports.hyphenName = function hyphenName (name) {
  return _.slugify(_.humanize(name));
};

exports.lowerCamelName = function lowerCamelName (name) {
  return _.camelize(_.slugify(_.humanize(name)));
};

exports.upperName = function upperName (name) {
  return _.classify(_.slugify(_.humanize(name)));
};

exports.stripNamespace = function stripNamespace (name) {
  return name.split('.').splice(1, 1).join('.');
};

exports.stripAngularTypes = function stripAngularTypes (name) {
  var re = /controller|ctrl|provider|factory$/i
  return name.replace(re, '');
};

exports.moduleName = function moduleName (name) {
    if (!name || name.legth <= 0) {
        return name;
    }

    // strip off trailing slashes
    var lastChar = name.charAt(name.length - 1);
    return (lastChar === '/' || lastChar === '\\')
        ? name.slice(0, name.length - 1)
        : name;
};
