(function() {
    'use strict';

    var gulp = require('gulp'),
        pipes = require('./pipes'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),
        partialOpts = {
            starttag: '// inject:{{ext}}',
            endtag: '// endinject',
            relative: true,
            transform: function (filepath) {
                return '@import "' + filepath + '";';
            }
        };

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function bowerStyles () {
        // We only want CSS and fonts included.
        // SASS should be included by a project SASS file instead so that
        // variables can be changed within the project.
        // Exclude Foundation because we are using a custom SCSS override.
        return plugins.mainBowerFiles({
            filter: [
                '**/*.{css,eot,svg,ttf,woff,woff2,map}',
                '!**/{foundation,foundation/**}'
            ]
        });
    }

    module.exports = {
        styles: function (isDist) {
            var dest = rootPath(isDist),
                mainFilter = plugins.filter('**/main.scss'),
                sassFilter = plugins.filter('**/*.{scss,sass}'),
                partials = gulp.src(options.paths.app + '**/_*.{scss,sass}', { base: options.paths.root });

            return plugins.streamSeries(
                    // Order matters
                    gulp.src(bowerStyles(), { base: './' }), // Include the bower_components folder in dest
                    gulp.src(options.paths.vendor + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.assets + '**/*.{scss,sass,css}', { base: options.paths.root }),
                    gulp.src(options.paths.app + '**/*.{scss,sass,css}', { base: options.paths.root })
                )
                .pipe(pipes.tools.plumber())

                // Inject app partials
                .pipe(mainFilter)
                .pipe(plugins.inject(partials, partialOpts))
                .pipe(mainFilter.restore())

                // Record sourcemaps
                .pipe(plugins.sourcemaps.init())

                    // Compile SASS and minify if dist build
                    .pipe(sassFilter)
                    .pipe(plugins.sass())
                    .pipe(plugins.if(isDist, pipes.styles.minify()))
                    .pipe(sassFilter.restore())

                // Write out sourcemaps
                .pipe(plugins.sourcemaps.write(options.paths.maps))

                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: ' Styles ', showFiles: true }));
        }
    };
})();
