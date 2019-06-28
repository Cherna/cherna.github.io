const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const stylus = require('gulp-stylus');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const browserify = require('browserify');
const babelify = require('babelify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Stylus compilation

gulp.task('styles', function (done) {
  gulp.src('public/styl/style.styl')
    .pipe(plumber())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./css/'))
    .pipe(notify({ message: 'Styles task complete' }));
  done();
});

// Image Compression

gulp.task('images', function(done) {
  gulp.src('public/images/*')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./img'))
    .pipe(notify({ message: 'Images task complete' }));
  done();
});

// Browserify

gulp.task('browserify', function(done) {
  // create the Browserify instance.
  browserify({
    entries: ['public/js/index.js'],
    debug: true,
    transform: [
      babelify.configure({
        presets: ["es2015"],
        ignore: /wow\.min\.js/
      })
    ]
  }).bundle()
      .on('error', console.error)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./js/'))

  done();
});

// Static index
gulp.task('index', function(done) {
  gulp.src('public/js/views/base/layout.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
  done();
});

// Default Task

gulp.task('default', function(done) {
  
  done();
});

gulp.task('watch', function(done) {

  // Watch .scss files
  gulp.watch(['public/**/*.styl', ], gulp.series('styles'));

  // Watch .js files
  gulp.watch(['public/js/**/*.js', 'public/**/*.pug', 'views/**/*.pug'], gulp.series('index', 'browserify'));

  // Watch image files
  gulp.watch('public/images/*', gulp.series('images'));

  done();
});

exports.default = gulp.series(
  'styles',
  'index',
  'browserify',
  'images',
  'watch');