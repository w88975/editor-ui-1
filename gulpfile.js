var gulp = require('gulp');

var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var vulcanize = require('gulp-vulcanize');

var paths = {
    js: 'src/**/*.js',
    ext_js: '../core/bin/**/*.js',
    html: 'src/**/*.html',
    css: 'src/**/*.styl',
    img: 'src/img/**/*',
};

// clean
gulp.task('clean', function() {
    return gulp.src('bin/**/*', {read: false})
    .pipe(clean())
    ;
});

// js
gulp.task('js', function() {
    return gulp.src(paths.js, {base: 'src'})
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(gulp.dest('bin'))
    ;
});
gulp.task('js-dev', function() {
    return gulp.src(paths.js, {base: 'src'})
    .pipe(gulp.dest('bin'))
    ;
});

// copy
gulp.task('cp-ext', function() {
    return gulp.src(paths.ext_js)
    .pipe(gulp.dest('bin'))
    ;
});
gulp.task('cp-img', function() {
    return gulp.src(paths.img)
    .pipe(gulp.dest('bin'))
    ;
});

// css
gulp.task('css', function() {
    return gulp.src(paths.css)
    .pipe(stylus({
        compress: true,
        include: 'src'
    }))
    .pipe(gulp.dest('bin'))
    ;
});

// html
gulp.task('copy-html', function() {
    return gulp.src(paths.html, {base: 'src'} )
    .pipe(gulp.dest('bin'))
    ;
});

// build html
gulp.task('build-html', ['copy-html'], function() {
    return gulp.src('bin/all.html')
    .pipe(vulcanize({
        dest: 'bin',
        inline: true,
    }))
    .pipe(gulp.dest('bin'))
    ;
});

// watch
gulp.task('watch', function() {
    gulp.watch(paths.ext_js, ['cp-ext', 'build-html']).on( 'error', gutil.log );
    gulp.watch(paths.js, ['js-dev', 'build-html']).on( 'error', gutil.log );
    gulp.watch(paths.css, ['css', 'build-html']).on( 'error', gutil.log );
    gulp.watch(paths.html, ['copy-html', 'build-html']).on( 'error', gutil.log );
    gulp.watch(paths.img, ['cp-img']).on ( 'error', gutil.log );
});

// tasks
gulp.task('default', [ 'cp-ext', 'cp-img', 'js', 'css', 'copy-html', 'build-html'] );
