var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');



gulp.task('minifyJS', ['js'], function (cb) {
  pump([
        gulp.src('./js/**/*.js'),
        uglify(),
        gulp.dest('./js/')
    ],
    cb
  );
});


gulp.task('watch', function() {
    gulp.watch('./css/**/*.less', ['minify-css']);
    gulp.watch('./javascript/**/*.js', ['minifyJS']);
});

gulp.task('images', function() {
    return gulp.src('./img/**/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('./img2'));
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

gulp.task('js', () => {
  return gulp.src('./javascript/**/*')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./js/'));
});

gulp.task('default', ['watch', 'images', 'minify-css', 'minifyJS']);