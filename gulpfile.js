'use strict';

const gulp = require('gulp');
const sassLib = require('sass');
const yargs = require('yargs');
const gulpSass = require('gulp-sass');
const gulpIf = require('gulp-if');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const logSymbols = require('log-symbols');
const del = require('del');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const sass = gulpSass(sassLib);
const server = require('browser-sync').create();
const zip = require('gulp-zip');
const replace = require('gulp-replace');
const info = require('./package.json');

const PRODUCTION = yargs(process.argv.slice(2)).argv.prod;

const paths = {
	styles: {
		src: 'src/scss/*.scss',
		dest: 'dist/css',
	},
	scripts: {
		src: ['src/js/bundle.js', 'src/js/admin.js'],
		dest: 'dist/js',
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png,gif,svg}',
		dest: 'dist/images',
	},
	files: {
		src: 'src/files/**/*.pdf',
		dest: 'dist/files',
	},
	package: {
		src: [
			'**/*',
			'!.vscode',
			'!node_modules{,/**}',
			'!packaged{,/**}',
			'!src{,/**}',
			'!.babelrc',
			'!gitignore',
			'gulpfile.js',
			'package*.json',
		],
		dest: 'packaged',
	},
};

// Building and minifying styles
gulp.task('buildStyles', () => {
	const processors = [autoprefixer, cssnano];

	return gulp
		.src(paths.styles.src)
		.pipe(gulpIf(!PRODUCTION, sourceMaps.init({ loadMaps: true })))
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulpIf(!PRODUCTION, sourceMaps.write('./')))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(server.stream());
});

gulp.task('scripts', function () {
	return gulp
		.src(paths.scripts.src)
		.pipe(named())
		.pipe(
			webpack({
				module: {
					rules: [
						{
							test: /\.js$/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env'],
								},
							},
						},
					],
				},
				output: {
					filename: '[name].js',
				},
				externals: {
					jquery: 'jQuery',
				},
				devtool: !PRODUCTION ? 'inline-source-map' : false,
				mode: PRODUCTION ? 'production' : 'development', //add this
			})
		)
		.pipe(gulp.dest(paths.scripts.dest));
});

// Optimizing Images
gulp.task('optimizeImages', () => {
	return gulp
		.src(paths.images.src)
		.pipe(gulpIf(PRODUCTION, imagemin()))
		.pipe(gulp.dest(paths.images.dest));
});

// Optimizing Files
gulp.task('optimizeFiles', () => {
	return gulp
		.src(paths.files.src)
		.pipe(gulpIf(PRODUCTION, imagemin()))
		.pipe(gulp.dest(paths.files.dest));
});

// Delete build directory
const devClean = () => {
	console.log(
		'\n\t' + logSymbols.info,
		'Cleaning build folder for fresh start.\n'
	);
	return del(['./dist']);
};

// Build Script - "npm run build"
gulp.task(
	'build',
	gulp.series(
		devClean,
		'buildStyles',
		'scripts',
		'optimizeImages',
		'optimizeFiles'
	)
);

// === Serving Browser

gulp.task('serve', function (done) {
	server.init({
		proxy: 'http://localhost/wordpress/themes',
	});
	done();
});

gulp.task('reload', function (done) {
	server.reload();
	done();
});

// !== Serving Browser

// === Development Task
gulp.task(
	'default',
	gulp.series('build', 'serve', () => {
		PRODUCTION,
			gulp.watch('src/scss/**/*.scss', gulp.series('buildStyles'));
		PRODUCTION,
			gulp.watch('src/js/**/*.js', gulp.series('scripts', 'reload'));
		PRODUCTION, gulp.watch('**/*.php', gulp.series('reload'));
		PRODUCTION,
			gulp.watch('src/images/*', gulp.series('optimizeImages', 'reload'));
	})
);


// === Production
gulp.task('compress', function (done) {
	return gulp.src(paths.package.src)
		.pipe(replace('_wp_theme_starter', info.name))
		.pipe(zip(`${info.name}-theme.zip`))
		.pipe(gulp.dest(paths.package.dest));
});


gulp.task('bundle', gulp.series('build', 'compress'));