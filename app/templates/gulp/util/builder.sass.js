(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
        });

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    function bowerStyles () {
        return plugins.mainBowerFiles(
            // We only want CSS and fonts included.
            // SASS should be included by a project SASS file instead so that
            // variables can be changed within the project.
            { filter: '**/*.{css,eot,svg,ttf,woff,woff2,map}' }
        );
    }

    module.exports = {
        sass: function (isDist) {
            var dest = rootPath(isDist),
                sassFilter = plugins.filter('**/*.{scss,sass}');

            var pipeline = plugins.streamSeries(
                    // Order matters
                    gulp.src(bowerStyles(), { base: './' }), // Include the bower_components folder in dest
                    gulp.src(options.paths.vendor + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.assets + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.app + '**/*.{scss,sass,css}', { base: options.paths.root })
                )
                .pipe(plugins.plumber(onError))
                .pipe(sassFilter)
                .pipe(plugins.sass()) // Only run SASS on SASS files
                .pipe(sassFilter.restore());

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.csso())
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }

            pipeline = pipeline
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: 'Sass: ' + dest }));

            return pipeline;
        }
    };
})();
