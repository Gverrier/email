
/**
 * This example:
 *  Uses the built-in BrowserSync server for HTML files
 *  Watches & compiles SASS files
 *  Watches & injects CSS files
 */
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var notify = require("gulp-notify");
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var	plumber = require('gulp-plumber');
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var lint = require('gulp-eslint'); //Lint JS files, including JSX


var config = {
	port: 8006,
	baseDir: './',
  indexDef: 'index.html',
	paths: {
		html: '*.html',
		js: './js/**/*.js',
		sass: './sass/*.scss',
		dist: './dist',
		mainJs: './js/app.js'
	}
}

//init tyo reload brower
var reload      = browserSync.reload;



// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        port: config.port,
        server: {
            baseDir: config.baseDir, //base
            index: config.indexDef //fichier a chargé
        }
    });
});


// reload a server
gulp.task('browser-reload', function (){
  reload({stream:true});
});

// Clean log, comments, remove old files
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});

// Sass task, will run when any SCSS files change.
gulp.task('sass', function() {
  return gulp.src('sass/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify("Style Modifié"))
    .pipe(reload({stream:true}));
});

//For js
gulp.task('js', function() {
  browserify(config.paths.mainJs)
  .transform(reactify)
  .bundle()
  .on('error', console.error.bind(console)) // debog error on console 
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(notify("ReactJs Modifié"))
  .pipe(reload({stream:true}));
});


// Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(reload({stream:true}))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images compressées' }));
});

//Lint to debog es6
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

//Debog html
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
    .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['html', 'sass', 'js', 'browser-sync'], function () {
    gulp.watch(config.paths.sass, ['sass']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.html, ['html']);
});
