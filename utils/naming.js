'use strict';

var _ = require('underscore.string');

var exports = module.exports;

exports.hyphenName = function hyphenName (name) {
  return _.slugify(_.humanize(name));
};

exports.lowerName = function lowerName (name) {
  return _.humanize(name).toLowerCase();
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
