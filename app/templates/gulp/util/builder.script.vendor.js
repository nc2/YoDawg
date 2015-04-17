(function() {
    'use strict';

    var gulp = require('gulp'),
        pipes = require('./pipes'),
        options = require('./options'),
        plugins = require('gulp-load-plugins')(options.loadPlugins);

    function rootPath(isDist) {
        return (isDist) ?
            options.paths.dist + 'vendor/' :
            options.paths.local + 'bower_components/';
    }

    module.exports = {
        vendor: function (isDist) {
            var dest = rootPath(isDist),
                jsFilter = plugins.filter('**/*.js');

            return plugins.streamSeries(
                    gulp.src(plugins.mainBowerFiles(), { base: options.paths.bower }),
                    gulp.src(options.paths.vendor + '**/*.js')
                )
                .pipe(pipes.tools.plumber())
                .pipe(plugins.changed(dest))
                .pipe(jsFilter)
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.if(isDist, pipes.scripts.vendor()))
                .pipe(plugins.sourcemaps.write(options.paths.maps))
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: ' Vendor ', showFiles: true }));
        }
    };
})();
