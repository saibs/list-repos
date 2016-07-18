/*eslint-env node */

module.exports = function(config) {
	const preloaders = [];

	if (config.enableIsparta) {
		preloaders.push({
			test: [/\.js$/],
			exclude: [/node_modules/, /\.spec.js$/],
			loaders: ['isparta']
		});
	}

	// ESLint should always lint the code.
	preloaders.push({
		test: /\.js$/,
		include: /\.spec\.js/,
		loaders: ['eslint-loader']
	});

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: ['spec.bundle.js'],

		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'spec.bundle.js': ['webpack', 'sourcemap']
		},

		webpack: {
			devtool: 'cheap-module-source-map',
			module: {
				preLoaders: preloaders,
				loaders: [{
					test: /\.js$/,
					exclude: [/node_modules/],
					loader: 'babel'
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
			isparta: {
				embedSource: true,
				noAutoWrap: true
			},
			resolve: {
				alias: {
				},
				modulesDirectories: [
					'node_modules'
				]
			}
		},

		webpackMiddleware: {
			stats: true
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['nyan', 'coverage'],

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultanous
		concurrency: Infinity
	});
};
