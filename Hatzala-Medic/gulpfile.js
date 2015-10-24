var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var situation = gulpHelpers.situation();
var _ = gulpHelpers.framework('_');
var runSequence = gulpHelpers.framework('run-sequence');
var gulpMarkdown = require('./tools/gulp/tasks/markdown');

var path = {
	source: 'src/**/*.js',
	react: 'src/**/*.jsx',
	html: '**/*.html',
	output: 'dist/',
	indexHtmlOutput: 'dist/index.html',
	minify: 'dist/**/*.js',
	assets: './resources/**/*.{css,png,jpg,gif,ico,svg,eot,ttf,woff,woff2,otf}',
	index: './src/index.html',
	watch: './src/**',
    sass: './resources/scss/**',
    css: 'dist/css/',
	systemConfig: './system.config.js'
};

var serverOptions = {
	open: false,
	ui: false,
	notify: false,
	ghostMode: false,
    files: ['src/components/*.js'],
	port: process.env.PORT || 9000,
	server: {
		baseDir: [path.output],
		routes: {
			'/system.config.js': './system.config.js',
			'/jspm_packages': './jspm_packages'
		}
	}
};

if (situation.isProduction()) {
	serverOptions = _.merge(serverOptions, {
		codeSync: false,
		reloadOnRestart: false,
		server: {
			snippetOptions: {
				rule: {
					match: /qqqqqqqqqqq/
				}
			}
		}
	});
}

var cacheBustConfig = {
	usePrefix: false,
	patterns: [
		{
			match: '<!-- PROD',
			replacement: ''
		}, {
			match: 'END -->',
			replacement: ''
		}, {
			match: '{{hash}}',
			replacement: Math.round(new Date() / 1000)
		}
	]
};

var babelCompilerOptions = {
    modules: 'system',
	stage: 2, // babel default, in case we would like to go wild
	optional: ['es7.classProperties']
};


taskMaker.defineTask('clean', {taskName: 'clean', src: path.output});
taskMaker.defineTask('babel', {taskName: 'babel', src: [path.source, path.react], dest: path.output, ngAnnotate: true, compilerOptions: babelCompilerOptions});
taskMaker.defineTask('copy', {taskName: 'systemConfig', src: path.systemConfig, dest: path.output});
taskMaker.defineTask('copy', {taskName: 'assets', src: path.assets, dest: path.output});
taskMaker.defineTask('copy', {taskName: 'index.html', src: path.index, dest: path.output, rename: 'index.html'});
taskMaker.defineTask('copy', {taskName: 'cache-bust-index.html', src: path.index, dest: path.output, rename: 'index.html', replace: cacheBustConfig});
taskMaker.defineTask('htmlMinify', {taskName: 'htmlMinify-index.html', taskDeps: ['cache-bust-index.html'], src: path.indexHtmlOutput, dest: path.output});
taskMaker.defineTask('watch', {taskName: 'watch', src: path.watch, tasks: ['compile', 'index.html', 'lint']});
taskMaker.defineTask('watch', {taskName: 'sass-watch', src: path.sass, tasks: ['sass']});
taskMaker.defineTask('minify', {taskName: 'minify', src: path.minify, dest: path.output});
taskMaker.defineTask('eslint', {taskName: 'lint', src: path.source});
taskMaker.defineTask('browserSync', {taskName: 'serve', config: serverOptions, historyApiFallback: true});
taskMaker.defineTask('sass', {taskName: 'sass', src: path.sass, dest: path.css});


gulp.task('compile', function(callback) {
    return runSequence('sass', ['babel', 'assets'], callback);
});


gulp.task('recompile', function(callback) {
	return runSequence('clean', ['compile'], callback);
});


gulp.task('run', function(callback) {
	if (situation.isProduction()) {
		return runSequence('recompile', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback);
	} else if (situation.isDevelopment()) {
        return runSequence('recompile', 'lint', 'index.html', 'serve', 'watch', 'sass-watch', callback);
	}
});

gulp.task('md' , function(callback){
	gulpMarkdown({src:'./resources/md/*.md', dest:'./resources/md/'});
});


gulp.task('default', ['md']);
