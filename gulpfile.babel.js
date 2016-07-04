/*eslint-env node */

import 'babel-polyfill';
import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import sync from 'run-sequence';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import yargs from 'yargs';
import del from 'del';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import eslint from 'gulp-eslint';
import gulpDocs from 'gulp-ngdocs';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import htmlreplace from 'gulp-html-replace';
import { Server as KarmaServer } from 'karma';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';

const root = 'src';

// helper method for resolving paths
const resolveToApp = (glob = '') => {
	return path.join(root, 'app', glob); // app/{glob}
};

const resolveToComponents = (glob = '') => {
	return path.join(root, 'app/features', glob); // app/components/{glob}
};

// map of all paths
const paths = {
	js: resolveToComponents('**/*.js'),
	specs: resolveToApp('**/*.spec.js'),
	html: [
		resolveToApp('**/*.html'),
		path.join(root, 'index.html')
	],
	entry: path.join(__dirname, root, 'app/bootstrap.js'),
	rootPath: path.join(__dirname, root),
	output: root,
	scss: path.join(__dirname, root, '**/*.scss'),
	mainSCSS: path.join(root, 'scss/main.scss'),
	blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
	dist: path.join(__dirname, 'www'),
	karmaConfig: path.join(__dirname, 'test/karma.conf.js'),
	docs: path.join(__dirname, 'docs/')
};

const assetsSrc = [
	root + '/assets/**/*',
	root + '/favicon.ico'
];

// use webpack.config.js to build modules
gulp.task('webpack', (cb) => {
	const config = require('./webpack.dist.config');

	webpack(config, (err, stats) => {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}

		gutil.log('[webpack]', stats.toString({
			colors: colorsSupported,
			chunks: false,
			errorDetails: true
		}));

		cb();
	});
});

gulp.task('build', (callback) => {
	sync(
		'test:unit',
		'build-clean',
		['webpack', 'copy-assets', 'remove-dev-bundle', 'sass'],
		callback
	);
});

gulp.task('build-clean', () => {
	return del([ paths.dist ]);
});

gulp.task('copy-assets', () => {
	return gulp
		.src(assetsSrc, {base: root})
		.pipe(gulp.dest(paths.dist));
});

gulp.task('test:unit', (done) => {
	const karmaServer = new KarmaServer({
		configFile: paths.karmaConfig,
		browsers: ['PhantomJS'],
		coverageReporter: {
			type: 'text'
		},
		enableIsparta: true
	}, function(exitCode) {
		done();
	});

	karmaServer.start();
});

gulp.task('test:unit:reporthtml', (done) => {
	const karmaServer = new KarmaServer({
		configFile: paths.karmaConfig,
		browsers: ['PhantomJS'],
		coverageReporter: {
			type: 'html',
			dir: 'coverage'
		},
		enableIsparta: true
	}, function(exitCode) {
		console.log(`Report is generated at file://${__dirname}/test/coverage\n`);

		done();

		process.exit(exitCode);
	});

	karmaServer.start();
});

gulp.task('test:lint', () => {
	return gulp.src([paths.js, '!node_modules/**', '!gulpfile.js', `!${paths.specs}`])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('ngdocs', [], function() {
	return gulp.src(paths.js)
		.pipe(gulpDocs.process())
		.pipe(gulp.dest(paths.docs));
});

gulp.task('serve', ['sass'], () => {
	const config = require('./webpack.dev.config');
	const compiler = webpack(config);

	serve({
		port: process.env.PORT || 8001,
		open: false,
		server: {
			baseDir: root,
			routes: {
				'/main.css': paths.dist + '/main.css',
				'/main.css.map': paths.dist + '/main.css.map'
			}
		},
		middleware: [
			webpackDevMiddleware(compiler, {
				stats: {
					colors: colorsSupported,
					chunks: false,
					modules: false
				},
				publicPath: config.output.publicPath
			}),
			webpackHotMiddleware(compiler)
		]
	});
	gulp.watch(paths.scss, ['sass']);
});

gulp.task('tdd', (done) => {
	const karmaServer = new KarmaServer({
		configFile: paths.karmaConfig,
		singleRun: false,
		autoWatch: true,
		reporters: ['nyan'],
		preprocessors: {
			'spec.bundle.js': ['webpack', 'sourcemap']
		}
	}, function(exitCode) {
		done();
		// Exit karma process manually on ctrl + c
		// Because watching files doesn't stop
		process.exit(exitCode);
	});

	karmaServer.start();
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
	const cap = (val) => {
		return val.charAt(0).toUpperCase() + val.slice(1);
	};
	const dash = (val) => {
		return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
	};
	const name = yargs.argv.name;
	const parentPath = yargs.argv.parent || '';
	const destPath = path.join(resolveToComponents(), parentPath, name);

	return gulp.src(paths.blankTemplates)
		.pipe(template({
			name: name,
			upCaseName: cap(name),
			dashName: dash(name)
		}))
		.pipe(rename((filePath) => {
			filePath.basename = filePath.basename.replace('temp', name);
		}))
		.pipe(gulp.dest(destPath));
});

gulp.task('remove-dev-bundle', () => {
	return gulp.src(path.join(root, 'index.html'))
		.pipe(htmlreplace({
			remove: ''
		}))
		.pipe(gulp.dest(paths.dist));
});

// no-op = empty function
gulp.task('noop', function() {});

gulp.task('default', (done) => {
	const testTask = yargs.argv.notests ? 'noop' : 'tdd';

	sync(
		['serve', testTask]
	);
});

gulp.task('sass', () => {
	return gulp.src((paths.mainSCSS))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.dist))
		.pipe(serve.stream({ match: '**/*.css' }));
});
