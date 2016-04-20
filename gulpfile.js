var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Scss compilation

gulp.task('styles', function() {
  gulp.src('public/styl/style.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Image Compression

gulp.task('images', function() {
  return gulp.src('public/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/optimized'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Browserify

gulp.task('browserify', function() {
    return browserify('public/js/index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('dist/js/'));
});

// Default Task

gulp.task('default', function() {
    gulp.start(
      'styles',
      'browserify',
      // 'images',
      'watch');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(['public/**/*.styl', ], ['styles']);

  // Watch .js files
  gulp.watch(['public/js/**/*.js', 'public/**/*.jade', 'views/**/*.jade'], ['browserify']);

  // Watch image files
  // gulp.watch('public/images/*', ['images']);

});