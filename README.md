# Advanced Modular Manikin - Web Interface

A simple web interface to interact with an AMM instance, based on [CoreUI Vue](https://github.com/coreui/coreui-free-vue-admin-template).

It is assumed that you are hosting this site from the same system running the [AMM REST Adapter](https://github.com/AdvancedModularManikin/rest-adapter).  You can hard-code an AMM REST Adapter in if needed by modifying the `src/main.js` file, line 237. 

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone http://github.com/advancedmodularmanikin/amm-web

# go into app's directory
$ cd amm-web

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# run linter
npm run lint

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

```
