var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var webpackProductionConfig = require('./webpack.production.config');

var path = {
	dist: 'dist',
	war: 'dist/**/*'
};

taskMaker.defineTask('clean', {taskName: 'clean', src: path.dist});
taskMaker.defineTask('compress', {taskName: 'compress', src: path.war, filename: 'hatzalla.war', dest: path.dist});


// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['webpack:build-dev'], function () {
	gulp.watch(['src/**/*'], ['webpack:build-dev']);
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function (callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackProductionConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin()
		//new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function (err, stats) {
		if (err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function (callback) {
	// run webpack
	devCompiler.run(function (err, stats) {
		if (err) throw new gutil.PluginError('webpack:build-dev', err);
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('webpack-dev-server', function (callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;
	myConfig.hot = true;
	myConfig.inline = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, 'localhost', function (err) {
			if (err) throw new gutil.PluginError('webpack-dev-server', err);
			gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
		});
});