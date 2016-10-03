var clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src(['bower_components/sweetalert/dist/sweetalert.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest('js/plugins'));
});
gulp.task('css', function() {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css','bower_components/sweetalert/dist/sweetalert.css'
    ]).pipe(gulp.dest('css/plugins'));
});
gulp.task('fonts', function() {
    return gulp.src(['bower_components/bootstrap/dist/fonts/*']).pipe(gulp.dest('css/fonts'));
})
gulp.task('cleanBowerFiles', ['js', 'css', 'fonts'], function() {
    return gulp.src('bower_components').pipe(clean({ force: true }));
})
gulp.task('jsMin', function() {
    return gulp.src(['js/puzzle-game-threes1536.js'])
        .pipe(concat('puzzle-game-threes1536.min.js')).pipe(ngAnnotate()).pipe(uglify({
            mangle: true
        })).pipe(gulp.dest('js'))
});

gulp.task('default', ['js', 'css', 'fonts','jsMin', 'cleanBowerFiles']); //release version
// gulp.task('default', ['js', 'css', 'fonts','toDist']); //development version
