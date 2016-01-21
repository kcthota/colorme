var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

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


gulp.task('lint', function() {
  return gulp.src('source/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('test', function () {
    return gulp.src(['spec/*.js'])
            .pipe(jasmine());
});