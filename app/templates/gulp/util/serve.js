(function() {
    'use strict';

    var runSequence = require('run-sequence'),
        browserSync = require('browser-sync');

    module.exports = {
        serve: function (port, dir, done) {
            browserSync({
                open: true,
                port: port,
                server: {
                    baseDir: dir,
                    index: 'index.html',
                    middleware: [
                        function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            next();
                        }
                    ]
                }
            }, done);
        }
    };
})();
