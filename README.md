## Project overview

- Angular 1.x(includes angular lifecycle hooks)
- Angular material & SASS
- ES6
- Generator for angular component
- Httpbackend stubs for development to mock server(Includes faker js well)
- Ready for heroku deployment as well.

## Quick install

### Installation

Run the following commands to clone the project and install the NPM dependencies:

## Installing
* `clone` this repo
* `npm install -g gulp karma karma-cli webpack` install global cli dependencies
* `cd` into your repo directory
* Run `npm whoami` to test that it is working
* `npm install` to install dependencies

### Production build

- After installing dependencies completing [Installing section](#installation) you can build using `npm run build`
- `./www` folder will have all of the built production application files
- Also has "heroku-postbuild" option configured.(Just deploy your code in heroku without worrying about which step to run :))

### Running the application

Run the following command to launch the project in a live-reloading development server:
```
gulp
```
(see 'Available gulp tasks' for other commands)

---

## Available npm commands

Most of the npm commands are an alias of a gulp tasks

### Generating Components

Gulp task

- `component`
  - scaffolds a new Angular component. Read below for usage details.

To generate a component, run `gulp component --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `src/app/features`. To change this, apply the `--parent` flag, followed by a path relative to `src/app/features/`.

For example, running `gulp component --name signup --parent auth` will create a `signup` component at `src/app/features/auth/signup`.

Running `gulp component --name footer --parent ../blocks` creates a `footer` component at `src/app/blocks/footer`.

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names.
