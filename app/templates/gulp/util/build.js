(function() {
    'use strict';

    var runSequence = require('run-sequence');

    module.exports = {
        build: function (isDist, callback) {
            var mode = (isDist) ? ':dist' : '';
            return runSequence(
                'clean' + mode,
                [
                    'js' + mode,
                    'sass' + mode,
                    'fonts' + mode,
                    'images' + mode,
                    'templates' + mode
                ],
                'html' + mode,
                callback
            );
        },
    };
})();
