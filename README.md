# YoDawg generator

> [Yeoman](http://yeoman.io) generator for SPA apps using AngularJS.  Quickly lets you stand up a site using sensible defaults that mostly follows the rules found here: [John Papa's Angular Styleguide](https://github.com/johnpapa/angular-styleguide)

There are as many starting points for building a new Angular single-page app as there are generators to generate them.  This one is extremely opinionated &mdash; and likes you for who you are.

![](https://bitbucket.org/repo/qy69kL/images/887290360-yo%20dawg.png)

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
git clone https://bitbucket.org/nc2media/yo-dawg.git yo-dawg

# link the repository in NPM
cd yo-dawg && npm link
```

Profit!
```bash
mkdir my-new-project && cd $_
yo dawg [app-name]
```

### Angular Generators

#### Structural
* [dawg](#app) (aka [dawg:app](#app))
* [dawg:module](#module)

#### Front-end
* [dawg:controller](#controller)
* [dawg:directive](#directive)
* [dawg:filter](#filter)
* [dawg:decorator](#decorator)

#### Services
* [dawg:provider](#provider)
* [dawg:factory](#factory)
* [dawg:service](#service)
* [dawg:constant](#constant)
* [dawg:value](#value)

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