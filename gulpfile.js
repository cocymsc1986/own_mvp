var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    webserver = require('gulp-webserver');

gulp.task('compass', function() {
  gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('app/assets/temp'));
});

gulp.task('compress-styles',function() {
   gulp.src('css/screen.css')
   .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'compress-styles task complete' }));
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

/*gulp.task('styles', function() {
  return gulp.src('sass/screen.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});*/

gulp.task('scripts', function() {
  return gulp.src(['js/vendor/**/*.js','js/init/*.js','js/*.js'])
//    .pipe(jshint('node_modules/gulp-jshint/.jshintrc'))
//    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js-min/compressed'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js-min/compressed'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/uncompressed/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images/'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', function() {
    gulp.start('compass', 'scripts', 'images');
});

gulp.task('watchstyles', function() {
    gulp.watch('sass/**/*.scss', ['compass','compress-styles'] );
})

gulp.task('watchscripts', function() {
    gulp.watch('js/**/*.js', ['scripts'] );
})

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('sass/**/*.scss', ['compass'] );

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('assets/images/uncompressed/*', ['images']);
});