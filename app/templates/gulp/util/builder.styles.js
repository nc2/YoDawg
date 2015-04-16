(function() {
    'use strict';

    var gulp = require('gulp'),
        lazypipe = require('lazypipe'),
        utilities = require('./utilities'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        utilities.logError( '[sass]', err );
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

    var minifyChannel = lazypipe()
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat, 'main.css')
        .pipe(plugins.rev);

    module.exports = {
        styles: function (isDist) {
            var dest = rootPath(isDist),
                mainFilter = plugins.filter('**/main.scss'),
                sassFilter = plugins.filter('**/*.{scss,sass}'),
                partials = gulp.src(options.paths.app + '**/_*.{scss,sass}', { base: options.paths.root });

            var pipeline = plugins.streamSeries(
                    // Order matters
                    gulp.src(bowerStyles(), { base: './' }), // Include the bower_components folder in dest
                    gulp.src(options.paths.vendor + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.assets + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.app + '**/*.{scss,sass,css}', { base: options.paths.root })
                )
                .pipe(plugins.plumber(onError))

                // Inject app partials
                .pipe(mainFilter)
                .pipe(plugins.inject(partials, {
                    starttag: '// inject:{{ext}}',
                    endtag: '// endinject',
                    relative: true,
                    transform: function (filepath) {
                        return '@import "' + filepath + '";';
                    }
                }))
                .pipe(mainFilter.restore())

                // Record sourcemaps
                .pipe(plugins.sourcemaps.init())

                    // Perform sass operations
                    .pipe(sassFilter)
                    .pipe(plugins.sass().on('error', onError))
                    .pipe(sassFilter.restore())

                    // Minify CSS
                    .pipe(plugins.if(isDist, minifyChannel()))

                // Write out sourcemaps
                .pipe(plugins.sourcemaps.write(options.paths.maps))

                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: 'Styles: ' + dest }));

            return pipeline;
        }
    };
})();
