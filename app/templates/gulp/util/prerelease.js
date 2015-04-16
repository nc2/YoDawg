(function() {
    'use strict';

    var gulp = require('gulp'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),
        fs = require('fs'),
        runSequence = require('run-sequence'),
        changelog = require('conventional-changelog'),
        argv = plugins.yargs.argv,
        validBumpTypes = 'major|minor|patch|prerelease'.split('|'),
        bump = (argv.bump || 'patch').toLowerCase();

    if(validBumpTypes.indexOf(bump) === -1) {
      throw new Error('Unrecognized bump "' + bump + '".');
    }

    module.exports = {
        // Runs any independent
        bumpVersion: function () {
            return gulp.src(['./package.json'])
                .pipe(plugins.bump({ type:bump })) //major|minor|patch|prerelease
                .pipe(gulp.dest('./'));
        },
        changeLog: function (callback) {
            var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
            return changelog({
                repository: pkg.repository.url,
                version: pkg.version,
                file: 'CHANGELOG.md'
            }, function(err, log) {
                fs.writeFileSync('CHANGELOG.md', log);
            });
        },
        prepRelease: function (callback) {
            return runSequence(
                'build:dist',
                'bump-version',
                'build:docs',
                'changelog',
                callback
            );
        }
    };
})();
