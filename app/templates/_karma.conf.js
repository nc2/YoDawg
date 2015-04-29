(function() {
    'use strict';
    var options = require('./gulp/util/options'),
        utilities = require('./gulp/util/utilities'),
        plugins = require('gulp-load-plugins')(options.loadPlugins),
        wiredep = require('wiredep'),
        specRunnerFile = 'specs.html',
        reports = '_report/'

    module.exports = function(config) {
        var files = [].concat(
            plugins.mainBowerFiles({
                filter: '**/*.js',
                paths: {
                    bowerDirectory: 'bower_components',
                    bowerrc: '.bowerrc',
                    bowerJson: 'bower.json'
                }
            }),
            'gulp/helpers/*.js',
            'bower_components/bardjs/dist/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/app/app.module.js',
            'src/app/**/*.module.js',
            'src/app/core/*.js',
            'src/app/**/*.js'
        );

        config.set({
            urlRoot: '/karma/',
            basePath: './',
            frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
            plugins: [
                'karma-angular-filesort', 'karma-chai',
                'karma-chai-as-promised', 'karma-chai-sinon',
                'karma-chrome-launcher', 'karma-coverage',
                'karma-nyan-reporter', 'karma-mocha',
                'karma-phantomjs-launcher', 'karma-sinon'
            ],
            files: files,
            angularFilesort: {
                whitelist: [
                    'src/app/**/*.js'
                ]
            },
            proxies: {
                '/': 'http://localhost:8888/'
            },
            preprocessors: {
                'src/**/!(*.spec)+(.js)': ['coverage']
            },
            reporters: ['nyan', 'coverage'],
            coverageReporter: {
                dir: reports,
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
                    {type: 'text', subdir: '.', file: 'text.txt'}
                ]
            },
            port: 9876,
            colors: true,
            autoWatch: true,
            browsers: ['PhantomJS'],

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
            // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        });
    };
}());
