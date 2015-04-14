(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
        }),
        options = require('./options');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        // Moves app scripts to the dest folder
        app: function (isDist) {
            var dest = rootPath(isDist),
                scripts = [
                    options.paths.app + '**/*.js',
                    '!' + options.paths.app + '**/*.spec.js'
                ];

            var pipeline = plugins.streamSeries(
                    gulp.src(scripts).pipe(plugins.angularFilesort())
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
