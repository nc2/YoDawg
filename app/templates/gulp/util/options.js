(function() {
    'use strict';

    var gutil = require('gulp-util'),
        srcRoot = '<%= srcDir %>/',
        appRoot = '<%= appDir %>/',
        assetRoot = '<%= assetDir %>/',
        bowerRoot = 'bower_components/',
        bowerJson = './bower.json',
        mapsRoot = 'sourcemaps/';

    module.exports = {
        module: '<%= appname %>',
        browserPorts: {
            local: 8080,
            dist: 8081,
            docs: 8082
        },
        loadPlugins: {
            lazy: false,
            pattern: [
                'gulp-*', 'run-sequence', 'browser-sync', 'main-bower-files',
                'uglify-save-license', 'del', 'yargs', 'event-stream', 'stream-series'
            ]
        },
        jshint: {
            verbose: true
        },
        paths: {
            root: srcRoot,
            app: appRoot,
            assets: assetRoot,
            bower: bowerRoot,
            bowerJson: bowerJson,
            maps: mapsRoot,
            appScriptOrder: [
                appRoot + 'app.module.js',
                appRoot + 'core/*.js',
                appRoot + 'blocks/*.js'
            ],
            images: [
                assetRoot + '**/*.{gif,jgp,png}'
            ],
            fonts: [
                bowerRoot + '**/*.{eot,svg,ttf,woff,woff2}',
                assetRoot + '**/*.{eot,svg,ttf,woff,woff2}'
            ],
            style: [
                assetRoot + '**/*.{scss,sass,css}'
            ],
            dist: '_dist/',
            local: '_local/',
            docs: '_docs/', // Uses YUI-Doc:  http://yui.github.io/yuidoc/
            e2e: 'e2e/',
            e2eSrc: 'test/e2e/src/*.js',
            e2eDist: 'test/e2e/dist/'
        }
    };
})();
