(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'event-stream', 'stream-series']
        }),
        options = require('./options');

    function rootPath(isDist) {
        return (isDist) ?
            options.paths.dist + 'vendor/' :
            options.paths.local + 'bower_components/';
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        vendor: function (isDist) {
            var dest = rootPath(isDist),
                jsFilter = plugins.filter('**/*.js');

            var pipeline = plugins.streamSeries(
                    gulp.src(plugins.mainBowerFiles(), { base: options.paths.bower }),
                    gulp.src(options.paths.vendor + '**/*.js')
                )
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(jsFilter);

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('vendor.js'))
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }

            pipeline = pipeline
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: 'Vendor.js: ' + dest }));

            return pipeline;
        }
    };
})();
