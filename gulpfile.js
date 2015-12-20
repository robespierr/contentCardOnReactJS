var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    browserify = require('gulp-browatchify');

gulp.task('connect', function() {
    connect.server({
        root: 'projects/build',
        livereload: true
    });
});

//css
gulp.task('css', function() {
    gulp.src('./projects/main/css/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', 'Opera 12.1', 'ie 9', 'ie 8'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./projects/build/css'))
        .pipe(connect.reload());
});

//html
gulp.task('html', function(){
    gulp.src('./projects/main/*.html')
        .pipe(gulp.dest('./projects/build'))
        .pipe(connect.reload());
});

//js
gulp.task('browserify', function () {
    gulp.src('./projects/main/js/app.js')
        .pipe(browserify({debug: !process.env.production, transforms:[reactify]}))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./projects/build/js'))
        .pipe(connect.reload());
});

//watch
gulp.task('watch', function() {
    gulp.watch('./projects/main/css/*.less', ['css']);
    gulp.watch('./projects/main/*.html', ['html']);
    gulp.watch('./projects/main/js/*.js', ['browserify']);
});

//default
gulp.task('default', ['connect', 'watch', 'html', 'css', 'browserify']);