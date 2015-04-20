(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        utilities = require('./utilities'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),

    // Pipe functions used in the lazy pipes below.
    bowerJs = function() {
        return plugins.inject(
            gulp.src(plugins.mainBowerFiles(), { read: false }),
            { name: 'bower' }
        );
    },
    bowerCss = function() {
        return plugins.inject(
            gulp.src(
                plugins.mainBowerFiles({
                    filter: [
                        '**/*.{css,eot,svg,ttf,woff,woff2,map}',
                        '!**/{foundation,foundation/**}'
                    ]
                }), { read: false }
            ),
            { name: 'bower' }
        );
    },
    css = function(isDist) {
        var dest = options.paths.local;
        // Order matters here. Import global styles before others.
        if (isDist) {
            dest = options.paths.dist;
        }
        return plugins.inject(plugins.streamSeries(
            gulp.src(dest + 'assets/styles/**/*.css', { read: false }),
            gulp.src(dest + 'app/**/*.css', { read: false })
        ), { ignorePath: dest });
    },
    js = function(isDist) {
        var dest = '';
        if(isDist) {
            dest = options.paths.dist;
            return plugins.inject(plugins.streamSeries(
                gulp.src(dest + 'vendor/**/*.js', { read: true }),
                gulp.src(dest + 'app/**/*.js', { read: true }).pipe(plugins.angularFilesort())
            ), { ignorePath: options.paths.dist });
        } else {
            dest = options.paths.local;
            return plugins.inject(plugins.streamSeries(
                gulp.src(dest + 'app/**/*.js', { read: true })
                    // Angular filesort is very important to preserve correct dependency
                    // ordering. Reading the files is necessary for filesort to work correctly.
                    .pipe(plugins.angularFilesort())
            ), { ignorePath: options.paths.local });
        }
    },
    onError = function(err) {
        utilities.logError( '[error]', err );
        this.emit('end');
    };

    module.exports = {
        html: {
            dist: plugins.lazypipe()
                .pipe(js, true)
                .pipe(css, true),
                //.pipe(plugins.minifyHtml, { empty: true, spare: true, quotes: true }),
            local: plugins.lazypipe()
                .pipe(bowerJs)
                .pipe(bowerCss)
                .pipe(js, false)
                .pipe(css, false)
        },
        scripts: {
            app: plugins.lazypipe()
                .pipe(plugins.ngAnnotate)
                .pipe(plugins.uglify)
                .pipe(plugins.concat, 'app.js')
                .pipe(plugins.rev),
            vendor: plugins.lazypipe()
                .pipe(plugins.uglify)
                .pipe(plugins.concat, 'vendor.js')
                .pipe(plugins.rev)
        },
        styles: {
            minify: plugins.lazypipe()
                .pipe(plugins.minifyCss)
                .pipe(plugins.concat, 'assets/main.css')
                .pipe(plugins.rev)
        },
        tools: {
            plumber: plugins.lazypipe()
                .pipe(plugins.plumber, onError)
        }
    };
})();
