(function() {
    'use strict';

    var gulp = require('gulp-help')(require('gulp')),
        build = require('../util/build'),
        options = require('../util/options'),
        utilities = require('../util/utilities'),
        serve = require('../util/serve'),
        preRelease = require('../util/prerelease'),
        htmlBuilder = require('../util/builder.html'),
        appScriptBuilder = require('../util/builder.script.app'),
        vendorScriptBuilder = require('../util/builder.script.vendor'),
        stylesBuilder = require('../util/builder.styles'),
        tests = require('../util/tests'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    // TASK RUNNERS
    // SERVER
    gulp.task('serve',
        'Builds the local SPA app and starts it in BrowserSync.',
        ['watch'],
        function(d) { return serve.serve(options.browserPorts.local, options.paths.local, d); }
    );
    gulp.task('serve:dist',
        'Builds the distribution SPA app and starts it in BrowserSync.',
        ['watch:dist'],
        function(d) { return serve.serve(options.browserPorts.dist, options.paths.dist, d); }
    );
    gulp.task('serve:docs',
        'Builds the SPA documentation and starts it in BrowserSync.',
        ['build:docs'],
        function(d) { return serve.serve(options.browserPorts.docs, options.paths.docs, d); }
    );
    gulp.task('serve:coverage',
        'Runs the tests, builds the coverage report and starts it in BrowserSync.',
        ['test'],
        function(d) { return serve.serve(options.browserPorts.coverage, options.paths.coverage, d); }
    );
    gulp.task('watch',      false, ['test:build'],      function() { return utilities.watch(false); });
    gulp.task('watch:dist', false, ['test:build-dist'], function() { return utilities.watch(true); });

    // TESTS
    gulp.task('test',
        'Run unit tests',
        function (done) { tests.run(done); }
    );
    gulp.task('test:build',      false, ['build'],      function (done) { tests.run(done); });
    gulp.task('test:build-dist', false, ['build:dist'], function (done) { tests.run(done); });

    // PROJECT BUILDERS
    gulp.task('build',
        'Runs the local SPA app build.',
        function(cb) { return build.build(false, cb); }
    );
    gulp.task('build:dist',
        'Runs the distribution SPA app build.',
        function(cb) { return build.build(true, cb); }
    );
    gulp.task('build:docs',
        'Runs the SPA documentation build.',
        function() { return utilities.gendocs(); }
    );

    // RELEASE PREP
    gulp.task('bump',
        'Bumps the version number',
        function() { return preRelease.bumpVersion(); },
        { options: {
            "type=patch": "The version number type to bump.  Valid values are: major, minor, patch, prerelease."
        } }
    );
    gulp.task('changelog',
        'Generates the change log.',
        function(cb) { return preRelease.changeLog(cb); }
    );
    gulp.task('prep-release',
        'Prepares the distribution build for release.',
        function(cb) { return preRelease.prepRelease(cb); }
    );

    // UTILITIES
    gulp.task('clean', false,      function(cb) { return utilities.clean(false, cb); });
    gulp.task('clean:dist', false, function(cb) { return utilities.clean(true, cb); });

    // SCRIPT BUILDERS
    gulp.task('js',
        'Processes the local SPA script build.  Only performs script minimization.',
        ['app.js', 'vendor.js']
    );
    gulp.task('js:dist',
        'Processes the distribution SPA script build.  Only performs script minimization.',
        ['app.js:dist', 'vendor.js:dist']
    );
    gulp.task('app.js', false, function() { return appScriptBuilder.app(false); });
    gulp.task('app.js:dist', false, function() { return appScriptBuilder.app(true); });
    gulp.task('vendor.js', false, function() { return vendorScriptBuilder.vendor(false); });
    gulp.task('vendor.js:dist', false, function() { return vendorScriptBuilder.vendor(true); });

    // STYLES BUILDERS
    gulp.task('styles',
        'Processes the local SPA application style build.  Currently supports CSS and SASS preprocessing and minimization.',
        function() { return stylesBuilder.styles(false); }
    );
    gulp.task('styles:dist',
        'Processes the distribution SPA application style build.  Currently supports CSS and SASS preprocessing and minimization.',
        function() { return stylesBuilder.styles(true); }
    );

    // VIEW BUILDER HELPERS
    gulp.task('fonts', false,          function() { return htmlBuilder.fonts(false); });
    gulp.task('fonts:dist', false,     function() { return htmlBuilder.fonts(true); });
    gulp.task('html', false,           function() { return htmlBuilder.html(false); });
    gulp.task('html:dist', false,      function() { return htmlBuilder.html(true); });
    gulp.task('images', false,         function() { return htmlBuilder.images(false); });
    gulp.task('images:dist', false,    function() { return htmlBuilder.images(true); });
    gulp.task('templates', false,      function() { return htmlBuilder.templates(false); });
    gulp.task('templates:dist', false, function() { return htmlBuilder.templates(true); });
})();
