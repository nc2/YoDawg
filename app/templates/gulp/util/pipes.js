(function() {
    'use strict';

    var lazypipe = require('lazypipe');

    // HTML PIPES

    // SASS PIPES
    var sassCompilePipe = function() {};
    var sassDistPipe = function() {};
    var sassLocalPipe = function() {};

    // SCRIPT PIPES

    module.exports = {
        sass: {
            compile: sassCompilePipe,
            dist: sassDistPipe,
            local: sassLocalPipe
        }
    };
})();
