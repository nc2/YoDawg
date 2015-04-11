'use strict';

var _ = require('lodash');
var yeoman = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');
var eol = require('os').EOL;
var utils = require('../utils');

var Generator = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', { type: String, required: false });
    this.appName = utils.lowerCamelName(this.name);
    this.appDir = 'app';
  },

  info: function () {
    this.log(yosay(
      chalk.red('Yo Dawg!') + eol +
      chalk.yellow('Freaking', chalk.bold('_Awesome_ '), 'Angular scaffolds of scaffolds ') + eol +
      chalk.gray('Black Bar Labs  ') // NOTE: extra spaces necessary to deal with bugs in yosay
    ));
  },

  checkConfig: function () {
    if (!this.config.get('config')) {
      return;
    }

    var done = this.async();
    this.prompt([{
      type: 'confirm',
      name: 'existingConfig',
      message: 'Yo, there\'s an existing .yo-rc configuration!  Would you like to use it?',
      default: true
    }], function (answers) {
      this.existingConfig = answers.existingConfig
      done();
    }.bind(this));
  },

  projectPrompts: function () {
    if (this.existingConfig) {
      return;
    }

    var done = this.async();
    this.prompt([{
      when: function (answers) { return !this.appname; }.bind(this),
      type: 'input',
      name: 'name',
      message: 'Yo, what would you like me to name this app?',
      default: utils.lowerCamelName(path.basename(process.cwd()))
    }], function (answers) {
      if (answers.name) {
        this.appName = utils.lowerCamelName(answers.name);
      }

      done();
    }.bind(this));
  },

  clientPrompts: function () {
    // None, yet
  },

  displayName: function () {
    this.log('Creating ' + chalk.green(this.appName) + ' app.');
  },

  projectFiles: function () {
    this.copy('__editorconfig', '.editorconfig');
    this.copy('__jshintrc', '.jshintrc');
    this.copy('__jscsrc', '.jscsrc');
    this.copy('__bowerrc', '.bowerrc');
  },

  packageFiles: function () {
    this.copy('gulp.png', 'gulp.png');
    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_gulpfile.js', 'gulpfile.js');
    this.template('_gulp.config.js', 'gulp.config.js');
    this.template('_karma.conf.js', 'karma.conf.js');
    this.template('_README.md', 'README.md');
  },

  appFiles: function () {
    this.directory('assets/images');
    this.directory('assets/styles');

    this.directory('app', this.appDir);

    this.template('_index.html', 'index.html');
    this.template('_specs.html', 'specs.html');
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    // If user chooses to use exsiting yo-rc file, then skip prompts
    if (this.existingConfig) {
      return;
    }

    this.config.set({
      config: {
        name: this.appName,
        paths: {
          app: this.appDir
        }
      }
    });
  }
});

module.exports = Generator;
