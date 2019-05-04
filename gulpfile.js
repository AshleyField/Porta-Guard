'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minifier');
var replaceName = require('gulp-replace-name');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(''));
});

gulp.task('minifyJS', function() {
  return gulp.src('./scripts/scripts.js').pipe(minify({
    minify: true,
    minifyJS: {
      sourceMap: true
    },
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('./scripts/minified-scripts'));
});

gulp.task('replaceNameJS', function() {
  return gulp.src('./scripts/minified-scripts/scripts.js')
    .pipe(replaceName(/\.js/g, '.min.js'))
    .pipe(gulp.dest('./minified'));
});
 
 // OLD VERSION
gulp.task('sass:watch', function () {

  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./scripts/scripts.js', ['minifyJS']);
  gulp.watch('./scripts/minified-scripts/scripts.js', ['replaceNameJS']);
});

// Gulp 4.X.X

// gulp.task('watch', function () {

//   gulp.watch('./scss/**/*.scss', gulp.series('sass'));
//   gulp.watch('./scss/*.scss', gulp.series('sass'));
//   gulp.watch('./scripts/scripts.js', gulp.series('minifyJS'));
//   gulp.watch('./scripts/minified-scripts/scripts.js', gulp.series('replaceNameJS'));
// });
