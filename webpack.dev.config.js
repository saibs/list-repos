'use strict';

const webpack = require('webpack');
const path    = require('path');
let config  = require('./webpack.config');


config.entry.app.push(
	// this modules required to make HRM working
	// it responsible for all this webpack magic
	'webpack-hot-middleware/client?reload=true'
);

config.entry.mock = [
	path.join(__dirname, 'mock/httpBackendStub.js')
];

config.output = {
	path: path.resolve(__dirname, 'client'),
	filename: '[name].bundle.js',
	publicPath: '/'
};

config.plugins = config.plugins.concat([
	// Adds webpack HMR support. It act's like livereload,
	// reloading page after webpack rebuilt modules.
	// It also updates stylesheets and inline assets without page reloading.
	new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
