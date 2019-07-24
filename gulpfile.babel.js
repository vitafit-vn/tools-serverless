import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import yarn from 'gulp-yarn';

gulp.task('clean-up', () => gulp.src('./dist', { allowEmpty: true, read: false }).pipe(clean({ allowEmpty: true })));

gulp.task('transpile', () =>
  gulp
    .src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
);

gulp.task('clone-serverless', () => gulp.src('./serverless.yml').pipe(gulp.dest('./dist')));

gulp.task('node-packages', () =>
  gulp
    .src('./package.json')
    .pipe(gulp.dest('./dist'))
    .pipe(yarn({ noLockfile: true, production: true }))
);

gulp.task('default', gulp.series('clean-up', gulp.parallel('transpile', 'clone-serverless', 'node-packages')));
