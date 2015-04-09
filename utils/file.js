'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var exports = module.exports;

function findFile (rootPath, conventions, extensions) {
  conventions = conventions || [''];
  extensions = extensions || ['js', 'es6'];

  var files = exports.permuteFiles(conventions, extensions, rootPath);
  var found = _.find(files, function (file) {
    return fs.existsSync(file);
  });
  return found;
}

exports.permuteFiles = function permuteFiles (conventions, extensions, rootPath) {
  var files = [];
  conventions.forEach(function (convention) {
    extensions.forEach(function (ext) {
      files.push(rootPath + convention + '.' + ext);
    });
  });
  return files;
};

exports.findModuleFile = function findModuleFile (modulePath) {
  var conventions = ['-module', ''];
  if (_.isArray(modulePath)) {
    for (var i = 0; i < modulePath.length; i++) {
      var found = findFile(modulePath[i], conventions);
      if (found) {
        return found;
      }
    }
    return null;
  }
  return findFile(modulePath, conventions);
};
