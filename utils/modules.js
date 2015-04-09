'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var exports = module.exports;

exports.cleanModuleName = function cleanModuleName (moduleName) {
  var lastChar = moduleName.charAt(moduleName.length - 1);
  return (lastChar === '/' || lastChar === '\\')
    ? moduleName.slice(0, moduleName.length - 1)
    : moduleName;
};
