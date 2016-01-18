var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('default', function () {

});

gulp.task('compress', function () {
  return gulp.src('lib/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src(['lib/*.js', 'spec/*spec.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
});