var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

gulp.task('watch', function() {
    gulp.watch('./css/main.less', ['minify-css']);
});

gulp.task('images', function() {
    return gulp.src('./img/**/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('./img'));
});

gulp.task('less', function () {
  return gulp.src('./css/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', ['less'],  function() {
  return gulp.src('./css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['watch', 'images', 'minify-css']);