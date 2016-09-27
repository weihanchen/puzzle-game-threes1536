var clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.min.js',
            'bower_components/d3/d3.min.js','bower_components/d3-cloud/build/d3.layout.cloud.js','bower_components/sweetalert/dist/sweetalert.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest('js/plugins'));
});
gulp.task('css', function() {
    return gulp.src(['bower_components/font-awesome/css/font-awesome.min.css','bower_components/bootstrap/dist/css/bootstrap.min.css','bower_components/sweetalert/dist/sweetalert.css'
    ]).pipe(gulp.dest('css/plugins'));
});
gulp.task('fonts', function() {
    return gulp.src(['bower_components/bootstrap/dist/fonts/*', 'bower_components/font-awesome/fonts/*']).pipe(gulp.dest('css/fonts'));
})
gulp.task('cleanBowerFiles', ['js', 'css', 'fonts'], function() {
    return gulp.src('bower_components').pipe(clean({ force: true }));
})
gulp.task('toDist', function() {
    return gulp.src(['src/angular-word-cloud.js'])
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs/dist'))
        .pipe(concat('angular-word-cloud.min.js')).pipe(ngAnnotate()).pipe(uglify({
            mangle: true
        })).pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs/dist'))
});

gulp.task('default', ['js', 'css', 'fonts','toDist', 'cleanBowerFiles']); //release version
// gulp.task('default', ['js', 'css', 'fonts','toDist']); //development version
