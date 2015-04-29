(function() {
    'use strict';

    var gulp = require('gulp'),
        pipes = require('./pipes'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),
        pngquant = require('imagemin-pngquant'),
        opts = {
            html: { empty: true, spare: true, quotes: true },
            uglify: { preserveComments: plugins.uglifySaveLicense },
            templateCache: {
                module: 'app.core',
                root: 'app/',
                standAlone: false
            },
            imagemin: {
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }
        };

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    module.exports = {
        html: function(isDist) {
            var dest = rootPath(isDist),
                path = options.paths.src + 'index.html';

            return gulp.src(path)
                .pipe(pipes.tools.plumber())
                .pipe(plugins.if( isDist , pipes.html.dist()))
                .pipe(plugins.if( !isDist , pipes.html.local()))
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: ' Html ', showFiles: options.preprocessors.verbose }));
        },
        fonts: function(isDist) {
            var fontFilter = plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'),
                dest = rootPath(isDist);

            return gulp.src(plugins.mainBowerFiles())
                .pipe(pipes.tools.plumber())
                .pipe(fontFilter)
                .pipe(plugins.flatten())
                .pipe(gulp.dest(dest + 'fonts/'))
                .pipe(plugins.size({ title: ' Fonts ', showFiles: options.preprocessors.verbose }));
        },
        images: function (isDist) {
            var dest = rootPath(isDist);

            return gulp.src(options.paths.assets + '/images/**/*.*')
                .pipe(pipes.tools.plumber())
                .pipe(plugins.if(isDist, plugins.imagemin(opts.imagemin)))
                .pipe(gulp.dest(dest + '/assets/images'));
        },
        other: function (isDist) {
            var dest = rootPath(isDist),
                src = [ options.root + '**/*', '!' + options.root + '**/*.{html,css,js,scss}' ];

            return gulp.src(src)
                .pipe(pipes.tools.plumber())
                .pipe(gulp.dest(dest + '/'));
        },
        templates: function(isDist) {
            var dest = rootPath(isDist),
                src = [ options.paths.app + '**/*.html', '!' + options.paths.app + '**/index.html' ];

            return gulp.src(src)
                .pipe(pipes.tools.plumber())
                .pipe(plugins.if(isDist, plugins.minifyHtml(opts.html)))
                .pipe(plugins.angularTemplatecache('templates.js', opts.templateCache))
                .pipe(plugins.if(isDist, plugins.rev()))
                .pipe(gulp.dest(dest + '/app'));
        }
    };
})();
