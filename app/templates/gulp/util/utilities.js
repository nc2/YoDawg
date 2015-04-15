(function() {
    'use strict';

    var _ = require('lodash'),
        gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'browser-sync', 'main-bower-files', 'uglify-save-license', 'del', 'yargs']
        }),
        del = require('del'),
        vinylPaths = require('vinyl-paths'),
        argv = plugins.yargs.argv,
        validBumpTypes = 'major|minor|patch|prerelease'.split('|'),
        bump = (argv.bump || 'patch').toLowerCase();

    if(validBumpTypes.indexOf(bump) === -1) {
      throw new Error('Unrecognized bump "' + bump + '".');
    }

    function reportChange(event) {
        var srcPattern = new RegExp('/.*(?=/' + options.paths.root + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    function rootPath(isDist) {
        return (isDist) ? [options.paths.dist, options.paths.docs] : options.paths.local;
    }

    function log(msg) {
        var blue = plugins.util.colors.blue;
        if (_.isObject(msg)) {
            _.forOwn(msg, function (value) {
                plugins.util.log(blue(value));
            });
        } else {
            plugins.util.log(blue(msg));
        }
    }

    module.exports = {
        log: log,
        bump: bump,
        clean: function (isDist) {
            var path = rootPath(isDist);
            return gulp.src(path)
                .pipe(plugins.plumber())
                .pipe(vinylPaths(del));
        },
        gendocs: function () {
            var path = options.paths.app + '**/*.js';
            return gulp.src(path)
              .pipe(plugins.plumber())
              .pipe(plugins.yuidoc.parser())
              .pipe(plugins.yuidoc.reporter())
              .pipe(plugins.yuidoc.generator())

              .pipe(gulp.dest(options.paths.docs));
        },
        watch: function (mode) {
            var root = options.paths.root,
                paths = {
                    index: root + '**/index.html',
                    js: root + '**/*.js',
                    sass: root + '**/*.scss',
                    templates: options.paths.app + '**/*.html'
                };

            gulp.watch(paths.templates, ['templates' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(paths.index,     ['html' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(paths.js,        ['js' + mode, plugins.browserSync.reload]).on('change', reportChange);
            gulp.watch(paths.sass,      ['sass' + mode, plugins.browserSync.reload]).on('change', reportChange);
        }
    };
})();
