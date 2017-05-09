const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const stylus = require('gulp-stylus');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cache = require('gulp-cache');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');

const browserify = require('browserify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Stylus compilation

gulp.task('styles', function() {
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
});

// Image Compression

gulp.task('images', function() {
  return gulp.src('public/images/*')
    .pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Browserify

gulp.task('browserify', function() {
  return browserify('public/js/index.js')
    .transform('babelify', {
      presets: ["es2015"],
      ignore: /wow\.min\.js/
    })
    .bundle()
    .on('error', (err) => console.error( new Error(err) ))
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(uglify())
    // Start piping stream to tasks!
    .pipe(gulp.dest('./js'));
});

// pug.compileFile('public/js/views/base/layout.pug')

// Static index
gulp.task('index', function() {
  gulp.src('public/js/views/base/layout.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

// Default Task

gulp.task('default', function() {
    gulp.start(
      'styles',
      'index',
      'browserify',
      'images',
      'watch');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(['public/**/*.styl', ], ['styles']);

  // Watch .js files
  gulp.watch(['public/js/**/*.js', 'public/**/*.pug', 'views/**/*.pug'], ['index', 'browserify']);

  // Watch image files
  gulp.watch('public/images/*', ['images']);

});