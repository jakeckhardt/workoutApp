'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task("compileSass", function() {
  return gulp.src("scss/styles.scss")
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
  gulp.watch("scss/**/*.scss", ["compileSass"]);
})
