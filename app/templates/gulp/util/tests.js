(function() {
    'use strict';
    var gulp = require('gulp'),
        options = require('./options'),
        utilities = require('./utilities'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    module.exports = {
        run: function (done) {
            plugins.karma.server.start({
                configFile: options.paths.root + '/karma.conf.js',
                singleRun: true
            }, function () {
                // Don't ask why "done()" has to
                // be called this way, it just does.
                // Otherwise failed assertions will
                // break Gulp's watch pipeline.
                // It's magic...
                done();
            });
        }
    };
})();
