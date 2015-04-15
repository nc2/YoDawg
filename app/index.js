'use strict';

var _ = require('lodash');
var fs = require('fs');
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

    this.appname = utils.lowerCamelName(this.name);

    this.srcDir = 'src';
    this.appDir = this.srcDir + '/app';
    this.assetDir = this.srcDir + '/assets';
  },

  info: function () {
    this.log(yosay(
      chalk.red('Yo Dawg!') + eol +
      chalk.yellow('Freaking', chalk.bold('_Awesome_ '), 'Angular scaffolds of scaffolds ') + eol +
      chalk.gray('Black Bar Labs  ') // NOTE: extra spaces necessary to deal with bugs in yosay
    ));
  },

  checkConfig: function () {
    var exists = fs.existsSync('.yo-rc.json');

    var done = this.async();
    this.prompt([{
      when: function (answers) { return exists; },
      type: 'confirm',
      name: 'useConfig',
      message: 'Yo, there\'s an existing .yo-rc configuration!  Would you like to use it?',
      default: true
    }], function (answers) {
      this.useConfig = answers.useConfig;
      done();
    }.bind(this));
  },

  projectPrompts: function () {
    if (this.useConfig) {
      this.appname = this.config.get('name');
      return;
    }

    var done = this.async();
    this.prompt([{
      when: function (answers) { return !this.appname; }.bind(this),
      validate: function (answers) {
        if (!answers.name) {
          return 'An app name is required.';
        }
        return true;
      },
      type: 'input',
      name: 'name',
      message: 'Yo, what would you like me to name this app?',
      default: utils.lowerCamelName(path.basename(process.cwd()))
    }], function (answers) {
      if (answers.name) {
        this.appname = utils.lowerCamelName(answers.name);
        this.config.set('name', this.appname);
      }

      done();
    }.bind(this));
  },

  clientPrompts: function () {
    // None, yet
  },

  displayName: function () {
    this.log('Creating ' + chalk.green(this.appname) + ' app.');
  },

  projectFiles: function () {
    this.copy('__editorconfig', '.editorconfig');
    this.copy('__jshintrc', '.jshintrc');
    this.copy('__jscsrc', '.jscsrc');
    this.copy('__bowerrc', '.bowerrc');
    this.copy('__gitignore', '.gitignore');
  },

  packageFiles: function () {
    this.directory('gulp');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.template('_gulpfile.js', 'gulpfile.js');
    this.template('_karma.conf.js', 'karma.conf.js');
    this.template('_README.md', 'README.md');
  },

  appFiles: function () {
    this.directory('src/app', this.appDir);
    this.directory('src/assets', this.assetsDir);

    this.template('src/_index.html', this.srcDir + '/index.html');
    this.template('src/_specs.html', this.srcDir + '/specs.html');
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.config.set({
      name: this.appname,
      paths: {
        src: this.srcDir,
        app: this.appDir,
        assets: this.assetDir
      }
    });
  }
});

module.exports = Generator;
