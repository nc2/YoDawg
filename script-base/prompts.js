'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var path = require('path');
var utils = require('../utils');

function logChoice(prompt, prop) {
  var choice = _.findWhere(prompt.choices, {value: prop});
  this.log('\t*', choice.name);
}

module.exports = function (Generator) {

    Generator.prototype.ask = function ask (prompt, accept, value) {
        if (value && prompt.validate && prompt.validate(value) === true) {
            return accept(value);
        }

        prompt.name = 'answer';

        var done = this.async();
        this.prompt(prompt, function (answers) {
            accept(answers.answer);
            done();
        });
    };

    Generator.prototype.askForModuleName = function askForModuleName (name) {
        var self = this;
        self.ask({
            validate: validate,
            type: 'input',
            message: 'Which module is this for?',
            default: name || self.config.get('lastModule') || 'app.myModule'
        }, function (module) {
            self.module = utils.moduleName(module);
            self.config.set('lastModule', self.module);
        });

        function validate (value) {
            if (!value) {
                return 'A module name is required.';
            }
            if (value.split('.').length < 2) {
                return 'A module name should always have a root namespace. (ie, app.core, blocks.logger, ...)';
            }
            if (value.split(' ').length > 1) {
                return 'A module name cannot contain spaces. (ie, app.core, blocks.logger, ...)';
            }
            return true;
        }
    };

    Generator.prototype.askForName = function askForName (name, transform) {
        var self = this;

        transform = transform || function (x) { return x; };
        name = transform(name);

        self.ask({
            validate: validate,
            type: 'input',
            message: 'What do you want to call it?',
            default: name || 'dawg'
        }, function (value) {
            self.name = transform(value);
        });

        function validate (value) {
            if (!value) {
                return 'A name is required.';
            }
            if (value.split(' ').length > 1) {
                return 'A name cannot contain spaces.';
            }
            return true;
        }
    };

};
