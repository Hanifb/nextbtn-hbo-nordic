var gulp = require('gulp'),
    clean = require('gulp-clean'),
    zip = require('gulp-zip'),
    exec = require('child_process').exec;

//clean build directory
gulp.task('clean', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

//copy static folders to build directory
gulp.task('chrome-copy', ['clean'], function () {
    gulp.src('icons/*')
        .pipe(gulp.dest('build/chrome'));
    gulp.src('src/*.*')
        .pipe(gulp.dest('build/chrome'));
    return gulp.src('src/chrome/*')
        .pipe(gulp.dest('build/chrome'));
});


gulp.task('chrome-zip', ['chrome-copy'], function () {
    var manifest = require('./manifest'),
        distFileName = manifest.name + '-chrome v' + manifest.version + '.zip';
    return gulp.src(['build/chrome/**'])
        .pipe(zip(distFileName))
        .pipe(gulp.dest('dist'));
});

gulp.task('firefox-copy', ['clean'], function () {
    gulp.src('icons/icon-128.png')
        .pipe(gulp.dest('build/firefox'));
    gulp.src('src/firefox/main.js')
        .pipe(gulp.dest('build/firefox/lib'));
    gulp.src(['src/*.*', 'src/firefox/injector.js'])
        .pipe(gulp.dest('build/firefox/data'));
    return gulp.src('src/firefox/package.json')
        .pipe(gulp.dest('build/firefox'));
});

gulp.task('firefox-zip', ['firefox-copy'], function () {
    var manifest = require('./manifest'),
        distFileName = manifest.name + '-firefox v' + manifest.version + '.xpi';
        exec('cd ./build/firefox && cfx xpi --output-file="../../dist/' + distFileName + '"');
});

//run all tasks after build directory has been cleaned
gulp.task('default', function () {
    gulp.start('chrome-zip');
    gulp.start('firefox-zip');
});

