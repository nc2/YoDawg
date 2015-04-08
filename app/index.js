'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var eol = require('os').EOL;

var Generator = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
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
  }
});

module.exports = Generator;
