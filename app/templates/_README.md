# <%= appname %>

**Generated from Yo Dawg**

>*Opinionated AngularJS style guide for teams*

>More details about the styles and patterns used in this app can be found in my [AngularJS Style Guide](https://github.com/johnpapa/angularjs-styleguide) and my [AngularJS Patterns: Clean Code](http://jpapa.me/ngclean) course at [Pluralsight](http://pluralsight.com/training/Authors/Details/john-papa) and working in teams.

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install Yeoman `npm install -g yo`

3. Install these NPM packages globally

    ```bash
    npm install -g bower gulp
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

## Running Dawg

### Linting
 - Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev --sync`

 - `--sync` opens it in a browser and updates the browser with any files changes.

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

## Exploring the project
Yo Dawg starter project

### Structure
The structure also contains a gulpfile.js.

	/app
	/assets
    /images
    /styles

### Installing Packages
When you generate the project it should run these commands, but if you notice missing packages, run these again:

 - `npm install`
 - `bower install`

### The Modules
The app has 4 feature modules and depends on a series of external modules and custom but cross-app modules

```
app --> [
        app.admin,
        app.dashboard,
        app.layout,
		app.core --> [
			ngAnimate,
			ngSanitize,
			ui.router,
			blocks.exception,
			blocks.logger,
			blocks.router
		]
    ]
```

#### Core Module
Core modules are ones that are shared throughout the entire application and may be customized for the specific application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies.

#### Blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

##### Blocks.Logger Module
The `blocks.logger` module handles logging across the Angular app.

##### Blocks.Exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

##### Blocks.Router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.
