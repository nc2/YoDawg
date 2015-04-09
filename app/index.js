'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var eol = require('os').EOL;
var utils = require('../utils');

var Generator = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: false
    });
  },

  info: function () {
    this.log(yosay(
      chalk.red('Yo Dawg!') + eol +
      chalk.yellow('Freaking', chalk.bold('_Awesome_ ')) +
      chalk.yellow('Angular scaffolds of scaffolds ') + eol +
      chalk.gray('Black Bar Labs  ')
    ));
  },

  composeScaffold: function () {
    var args = this.appName ? [ this.appName ] : [];
    this.composeWith('gulp-angular', {
      args: args,
      options: {
        'skip-welcome-message': 'true'
      }
    });
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    // TODO: Pass in configuration values such as the app directory
    var config = utils.getGeneratorConfig(this.config);

    // Update configurations
    var rootDir = this.destinationRoot();
    this.config.set({
      dirs: {
        app: path.join(config.paths.src, 'app')
      }
    })
  }
});

module.exports = Generator;
