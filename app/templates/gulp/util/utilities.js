(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),
        reload = plugins.browserSync.reload,
        del = require('del'),
        vinylPaths = require('vinyl-paths');

    function rootPath(isDist) {
        return (isDist) ? [options.paths.dist, options.paths.docs] : options.paths.local;
    }

    function onLog(title, msg) {
        console.log(
            '\r\n' +
            plugins.util.colors.green(' ' + title + ' ') + '\r\n' +
            plugins.util.colors.grey(msg) + '\r\n'
        );
    }

    function onError(title, err) {
        console.log(
            '\r\n' +
            plugins.util.colors.white.bgRed(' ' + title + ' ') + '\r\n' +
            plugins.util.colors.cyan(err.message) + '\r\n' +
            plugins.util.colors.grey(err.fileName + ':' + err.lineNumber) + '\r\n'
        );
    }

    module.exports = {
        logError: onError,
        log: onLog,
        clean: function (isDist) {
            var path = rootPath(isDist);
            return gulp.src(path)
                .pipe(plugins.plumber(function(err) {
                    onError('[clean]', err);
                    this.emit('end');
                }))
                .pipe(vinylPaths(del));
        },
        gendocs: function () {
            var path = options.paths.app + '**/*.js';
            return gulp.src(path)
              .pipe(plugins.plumber(function(err) {
                  onError('[gendocs]', err);
                  this.emit('end');
              }))
              .pipe(plugins.yuidoc.parser())
              .pipe(plugins.yuidoc.reporter())
              .pipe(plugins.yuidoc.generator())
              .pipe(gulp.dest(options.paths.docs));
        },
        watch: function (isDist) {
            var root = options.paths.root,
                ext = (isDist) ? ':dist' : '',
                paths = {
                    index: root + '**/index.html',
                    js: root + '**/*.js',
                    styles: root + '**/*.{scss,sass,css}',
                    templates: options.paths.app + '**/*.html'
                };

            // Index
            plugins.watch(paths.index, function () {
                plugins.runSequence( 'html' + ext, reload );
            });

            // Styles
            plugins.watch(paths.styles, function () {
                plugins.runSequence( 'styles' + ext, [ 'html' + ext ], reload );
            });

            // Scripts
            plugins.watch(paths.js, function () {
                plugins.runSequence( 'js' + ext, [ 'html' + ext, 'templates' + ext ], reload );
            });

            // Templates
            plugins.watch(paths.templates, function () {
                plugins.runSequence( 'templates' + ext, [ 'html' + ext ], reload );
            });
        }
    };
})();
