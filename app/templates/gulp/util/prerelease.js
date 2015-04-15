(function() {
    'use strict';

    var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        changelog = require('conventional-changelog'),
        fs = require('fs'),
        bump = require('gulp-bump'),
        args = require('../args');

    module.exports = {
        // Runs any independent
        bumpVersion: function () {
            return gulp.src(['./package.json'])
                .pipe(bump({type:args.bump })) //major|minor|patch|prerelease
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
                'gendocs',
                'changelog',
                callback
            );
        }
    };
})();
