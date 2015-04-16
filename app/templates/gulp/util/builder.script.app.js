(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        utilities.logError( '[app.js]', err );
        this.emit('end');
    }

    module.exports = {
        // Moves app scripts to the dest folder
        app: function (isDist) {
            var dest = rootPath(isDist);

            var pipeline = plugins.streamSeries(
                    gulp.src([
                            options.paths.app + '**/*.js',
                            '!' + options.paths.app + '**/*.spec.js'
                        ]).pipe(plugins.angularFilesort())
                )
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(plugins.jshint('.jshintrc'))
                .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: options.jshint.verbose }));

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ngAnnotate())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('app.js'))
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }
            pipeline = pipeline
                .pipe(gulp.dest(dest + '/app'))
                .pipe(plugins.size({ title: 'App.js: ' + dest }));

            return pipeline;
        }
    };
})();
