/*eslint-env node */

const path = require('path');

const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		app: ['babel-polyfill', path.join(__dirname, 'src/app/bootstrap.js')]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count) {
				// Don't include things under '/src' folder
				return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
			}
		})
	],
	module: {
		preLoaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.js$/,
			exclude: [/node_modules/],
			loader: 'ng-annotate!babel'
		}, {
			test: /\.es6\.js$/,
			loader: 'babel'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'raw'
		}, {
			test: /\.(jpe?g|png|eot|woff|ttf|gif|svg)(\?.*)?$/i,
			loader: 'url-loader'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}]
	},
	resolve: {
		alias: {
		},
		modulesDirectories: [
			'node_modules',
			'mock/data' //Load mock data from this directory
		]
	}
};
