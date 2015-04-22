(function() {
    'use strict';

    var gulp = require('gulp'),
        pipes = require('./pipes'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    module.exports = {
        // Moves app scripts to the dest folder
        app: function (isDist) {
            var dest = rootPath(isDist);

            return plugins.streamSeries(gulp.src([
                    options.paths.app + '**/*.js',
                    '!**/*.spec.js'
                ])
                .pipe(plugins.angularFilesort()))
                .pipe(pipes.tools.plumber())
                .pipe(plugins.changed(dest))
                .pipe(plugins.jshint('.jshintrc'))
                .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.if(isDist, pipes.scripts.app()))
                .pipe(plugins.sourcemaps.write(options.paths.maps))
                .pipe(gulp.dest(dest + '/app'))
                .pipe(plugins.size({ title: ' App ', showFiles: options.preprocessors.verbose }));
        }
    };
})();
