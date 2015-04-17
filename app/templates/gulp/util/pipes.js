(function() {
    'use strict';

    var lazypipe = require('gulp-load-plugins')(options.loadPlugins);

    // HTML PIPES


    // SASS PIPES
    var sassCompilePipe = function() {};
    var sassDistPipe = function() {};
    var sassLocalPipe = function() {};
    var sassMinifyPipe = function() {};

    // SCRIPT PIPES


    module.exports = {
        sass: {
            minify: sassMinifyPipe,
            compile: sassCompilePipe,
            dist: sassDistPipe,
            local: sassLocalPipe
        }
    };
})();
