import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';

gulp.task('clean', () => gulp.src('./dist', { allowEmpty: true, read: false }).pipe(clean({ allowEmpty: true })));

gulp.task('transpile', () =>
  gulp
    .src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series('clean', 'transpile'));
