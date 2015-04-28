# YoDawg generator

> [Yeoman](http://yeoman.io) generator for SPA apps using AngularJS.  Quickly lets you stand up a site using sensible defaults that mostly follows the rules found here: [John Papa's Angular Styleguide](https://github.com/johnpapa/angular-styleguide)

There are as many starting points for building a new Angular single-page app as there are generators to generate them.  This one is extremely opinionated - and likes you for who you are.

![](https://raw.githubusercontent.com/nc2/YoDawg/master/yo%20dawg.png)

## Getting Started

### Site Scaffolding

For step-by-step instructions on using Yeoman and this generator to build a sample application from scratch see [this tutorial](http://todo.com).

Install `yo`, `gulp`, and `bower`:

```bash
npm install -g yo gulp bower
```

Since this is a special (and private for now) generator, there are equally special instructions to get it running on your machine:

```bash
# clone the repository somewhere
git clone https://github.com/nc2/YoDawg.git yo-dawg

# link the repository in NPM
cd yo-dawg && npm link
```

Profit!
```bash
mkdir my-new-project && cd $_
yo dawg [app-name]
```

Once your project scaffolding has finished generating, you can build and run your site using gulp tasks.
```bash
gulp serve
```

Running just the gulp command will list out all main build tasks.

```bash
gulp
```

### Angular Generators

#### Structural
* [dawg](#markdown-header-app) (aka [dawg:app](#markdown-header-app))
* [dawg:module](#markdown-header-module)

#### Front-end
* [dawg:controller](#markdown-header-controller)
* [dawg:directive](#markdown-header-directive)
* [dawg:filter](#markdown-header-filter)
* [dawg:decorator](#markdown-header-decorator)

#### Services
* [dawg:provider](#markdown-header-provider)
* [dawg:factory](#markdown-header-factory)
* [dawg:service](#markdown-header-service)
* [dawg:constant](#markdown-header-constant)
* [dawg:value](#markdown-header-value)

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started.  The app generator is currently very prescriptive and will use the following technologies: [font-awesome](), [foundation](), [jquery](), [restangular](), and [gulp]().

Example:
```bash
yo dawg [app-name]
```

### Module
Creates a new module for application code to reside and wires it up to the root app module.

Example:
```bash
yo dawg:module namedModule
```

Produces:
```bash
src/app/core/named.module.js
src/app/core/named.module.spec.js
```

** Required to provide a module namespace &mdash; `app` is the default. (i.e., `app.core`)**

### Controller
Generates a new application controller.

Example:
```bash
yo dawg:controller namedController
? Which module?: app.core
```

Produces:
```bash
src/app/core/named.controller.js
src/app/core/named.controller.spec.js
```

## License

MIT
