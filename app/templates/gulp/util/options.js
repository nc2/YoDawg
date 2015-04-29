(function() {
    'use strict';

    var root = __dirname + '/../..',
        srcRoot = '<%= srcDir %>/',
        appRoot = '<%= appDir %>/',
        assetRoot = '<%= assetDir %>/',
        bowerRoot = 'bower_components/',
        bowerJson = './bower.json',
        mapsRoot = 'sourcemaps/';

    module.exports = {
        module: '<%= appname %>',
        babel: {
          filename: '',
          filenameRelative: '',
          blacklist: [],
          whitelist: [],
          modules: '',
          sourceMap: true,
          sourceMapName: '',
          sourceRoot: '',
          moduleRoot: '',
          moduleIds: false,
          experimental: false,
          format: {
            comments: false,
            compact: false,
            indent: {
              parentheses: true,
              adjustMultilineComment: true,
              style: "  ",
              base: 0
            }
          }
        },
        preprocessors: {
            verbose: false
        },
        browserPorts: {
            local: 8080,
            dist: 8081,
            docs: 8082,
            coverage: 8083
        },
        loadPlugins: {
            lazy: false,
            pattern: [
                'gulp-*', 'browser-sync', 'del', 'event-stream', 'lazypipe', 'karma', 'main-bower-files',
                'run-sequence', 'stream-series', 'uglify-save-license', 'wiredep', 'yargs'
            ]
        },
        jshint: {
            verbose: true
        },
        paths: {
            root: root,
            src: srcRoot,
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
            dist: '_build/',
            local: '_build/',
            docs: '_docs/', // Uses YUI-Doc:  http://yui.github.io/yuidoc/
            coverage: '_report/report-html/',
            testSpecs: [srcRoot + '/**/*.spec.js']
        }
    };
})();
