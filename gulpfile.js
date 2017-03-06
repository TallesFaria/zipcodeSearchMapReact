const gulp = require('gulp');
const browserify = require('browserify');
const vinylSourceStream = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const htmlMinifier = require('gulp-html-minifier');
const uglify = require('gulp-uglify');

gulp.task('build-js-for-development', () => browserify('./source/js/app.jsx')
    .transform('babelify', { presets: ['react'] })
    .bundle()
    .pipe(vinylSourceStream('app.js'))
    .pipe(gulp.dest('./build/js/')));

gulp.task('build-js-for-production', () => browserify('./source/js/app.jsx')
    .transform('babelify', { presets: ['react'] })
    .bundle()
    .pipe(vinylSourceStream('app.js'))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/')));

gulp.task('build-html-for-development', () => 
gulp.src('./source/*.html').pipe(gulp.dest('./build')));

gulp.task('build-html-for-production', () => gulp
    .src('./source/*.html')
    .pipe(htmlMinifier({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build')));

gulp.task('watch', () => {
  gulp.watch('./source/js/**/*.{jsx,js}', ['build-js-for-development']);
  gulp.watch('./source/**/*.html', ['build-html-for-development']);
});

gulp.task('build-for-development', ['build-js-for-development', 'build-html-for-development']);
gulp.task('build-for-production', ['build-js-for-production', 'build-html-for-production']);

gulp.task('default', ['build-js-for-development', 'build-html-for-development', 'watch']);
