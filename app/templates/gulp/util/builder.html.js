(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false,
            pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'event-stream', 'stream-series']
        }),
        pngquant = require('imagemin-pngquant'),
        opts = {
            html: { empty: true, spare: true, quotes: true },
            uglify: { preserveComments: plugins.uglifySaveLicense },
            imagemin: {
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            },
            templateCache: {
                module: options.module + '.core',
                root: 'app/',
                standAlone: false
            }
        };

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function destPath(isDist, path) {
        return rootPath(isDist) + path;
    }

    function jsDist(dest) {
        return plugins.streamSeries(
            gulp.src(dest + 'vendor/**/*.js', { read: true }),
            gulp.src(dest + 'app/**/*.js', { read: true })
                .pipe(plugins.angularFilesort())
        );
    }

    function jsLocal(dest) {
        return plugins.streamSeries(
            // Angular filesort is very important to preserve correct
            // dependency ordering.  Reading the files is necessary
            // for filsort to work correctly.
            gulp.src(dest + 'app/**/*.js', { read: true })
                .pipe(plugins.angularFilesort())
        );
    }

    function cssDist(dest) {
        return gulp.src(options.paths.dist + '**/*.css');
    }

    function cssLocal(dest) {
        return plugins.streamSeries(
            // Order matters here. Import global styles before others.
            gulp.src(dest + 'assets/styles/**/*.css', { read: false }),
            gulp.src(dest + 'app/**/*.scss', { read: false })
        );
    }

    function bower() {
        return gulp.src(plugins.mainBowerFiles(), { read: false });
    }

    module.exports = {
        html: function(isDist) {
            var dest = rootPath(isDist);

            var pipeline = gulp.src(options.paths.root + 'index.html')
            if(isDist) {
                pipeline = pipeline
                    .pipe(plugins.inject(jsDist(dest), { ignorePath: dest }))
                    .pipe(plugins.inject(cssDist(dest), { ignorePath: dest }))
                    //.pipe(plugins.minifyHtml(opts.html))
            } else {
                pipeline = pipeline
                    .pipe(plugins.inject(bower(), { name: 'bower' }))
                    .pipe(plugins.inject(jsLocal(dest), { ignorePath: dest }))
                    .pipe(plugins.inject(cssLocal(dest), { ignorePath: dest }))
            }
            pipeline = pipeline
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: 'Html: ' + dest }));

            return pipeline;
        },
        fonts: function(isDist) {
            var fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'),
                dest = rootPath(isDist);
            return gulp.src(plugins.mainBowerFiles())
                .pipe(fontFilter)
                .pipe(plugins.flatten())
                .pipe(gulp.dest(dest + 'fonts/'))
                .pipe(plugins.size({ title: 'Fonts: ' + dest }));
        },
        images: function (isDist) {
            var dest = rootPath(isDist);
            return gulp.src(options.paths.assets + '/images/**/*.*')
                .pipe(plugins.if(isDist, plugins.imagemin(opts.imagemin)))
                .pipe(gulp.dest(dest + '/assets/images'));
        },
        other: function (isDist) {
            var dest = rootPath(isDist);
            return gulp.src([
                    options.root + '**/*',
                    '!' + options.root + '**/*.{html,css,js,scss}'
                ])
                .pipe(gulp.dest(dest + '/'));
        },
        templates: function(isDist) {
            var dest = rootPath(isDist),
                src = [
                    options.paths.app + '**/*.html',
                    '!' + options.paths.app + '**/index.html'
                ];
            var pipeline = gulp.src(src)
                .pipe(plugins.if(isDist, plugins.minifyHtml(opts.html)))
                .pipe(plugins.angularTemplatecache('templates.js', opts.templateCache))
                .pipe(plugins.rev())
                .pipe(gulp.dest(dest + '/app'));
            return pipeline;
        }
    };
})();
