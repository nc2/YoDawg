'use strict';

var _ = require('lodash');

_.assign(module.exports, require('./app'));
_.assign(module.exports, require('./modules'));
_.assign(module.exports, require('./naming'));
_.assign(module.exports, require('./file'));
