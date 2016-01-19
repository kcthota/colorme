var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('default', ['lint', 'test', 'compress']);

gulp.task('travis', ['lint', 'test']);

gulp.task('compress', function () {
  return gulp.src('source/*.js')
	.pipe(uglify({
        preserveComments: 'license'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src(['source/*.js', 'spec/*spec.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
});

gulp.task('lint', function() {
  return gulp.src('lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
