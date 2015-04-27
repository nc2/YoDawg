(function() {
    'use strict';

    var gulp = require('gulp-help')(require('gulp'), { description: 'Display this help text.', aliases: ['?', 'h'] }),
        karma = require('karma').server,
        options = require('../util/options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    // for full documentation of gulp-protractor,
    // please check https://github.com/mllrsohn/gulp-protractor
    gulp.task('webdriver_update', false, plugins.protractor.webdriver_update);

    // transpiles files in
    // /test/e2e/src/ from es6 to es5
    // then copies them to test/e2e/dist/
    gulp.task('build:e2e', false, function () {
      return gulp.src(options.paths.e2eSrc)
        .pipe(plugins.plumber())
        .pipe(plugins.babel())
        .pipe(gulp.dest(options.paths.e2eDist));
    });

    // runs build-e2e task
    // then runs end to end tasks
    // using Protractor: http://angular.github.io/protractor/
    gulp.task('e2e', 'Performs end to end script testing.',
        ['webdriver_update', 'build-e2e'],
        function(cb) {
            return gulp.src(options.paths.e2eDist + "/*.js")
                .pipe(plugins.protractor.protractor({
                    configFile: "protractor.conf.js",
                    args: ['--baseUrl', 'http://127.0.0.1:9000']
                })).on('error', function(e) { throw e; });
        }
    );

    gulp.task('test',
        'Run tests once and exit',
        function (done) {
            karma.start({
                configFile: '../karma.config.js',
                singleRun: true
            }, function(e) {
                done();
            });
        }
    );

    gulp.task('test:serve',
        'Watch for file changes and re-run tests on each change',
        function (done) {
            karma.start({
                configFile: '../karma.config.js'
            }, function(e) {
                done();
            });
        }
    );
})();
