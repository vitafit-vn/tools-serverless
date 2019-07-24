import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import file from 'gulp-file';
import yarn from 'gulp-yarn';

const PACKAGE_JSON = {
  dependencies: {
    '@babel/runtime': '^7.5.5',
  },
};

gulp.task('clean', () => gulp.src('./dist', { allowEmpty: true, read: false }).pipe(clean({ allowEmpty: true })));

gulp.task('transpile', () =>
  gulp
    .src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
);

gulp.task('clone-serverless', () => gulp.src('./serverless.yml').pipe(gulp.dest('./dist')));

gulp.task('node-packages', () =>
  gulp
    .src('.')
    .pipe(file('package.json', JSON.stringify(PACKAGE_JSON, null, 2)))
    .pipe(gulp.dest('./dist'))
    .pipe(yarn())
);

gulp.task('default', gulp.series('clean', gulp.parallel('transpile', 'clone-serverless', 'node-packages')));
