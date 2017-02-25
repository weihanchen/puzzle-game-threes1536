var clean = require('gulp-clean'),
   cleanCSS = require('gulp-clean-css'),
   concat = require('gulp-concat'),
   gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('jsLib', function() {
   return gulp.src(['node_modules/sweetalert/dist/sweetalert.min.js',
         'node_modules/bootstrap/dist/js/bootstrap.min.js'
      ])
      .pipe(gulp.dest('examples/js/plugins'));
});

gulp.task('cssLib', function() {
   return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/sweetalert/dist/sweetalert.css']).pipe(gulp.dest('examples/css/plugins'));
});

gulp.task('fontsLib', function() {
   return gulp.src(['node_modules/bootstrap/dist/fonts/*']).pipe(gulp.dest('examples/css/fonts'));
});

gulp.task('library', ['jsLib', 'cssLib', 'fontsLib'])

gulp.task('cssMin', function() {
   return gulp.src(['src/puzzle-game-threes1536.css'])
      .pipe(concat('puzzle-game-threes1536.min.css'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('examples/css'))
});

gulp.task('jsMin', function() {
   return gulp.src(['src/puzzle-game-threes1536.js'])
      .pipe(concat('puzzle-game-threes1536.min.js')).pipe(uglify({
         mangle: true
      })).pipe(gulp.dest('examples/js'))
});

gulp.task('minify', ['cssMin', 'jsMin']);

gulp.task('default', ['library', 'minify']);
