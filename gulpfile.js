const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task(
    'sass',
    () => gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', includePaths: ['sass']})
            .on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/styles')));

gulp.task(
    'js',
    () => gulp.src('scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['@babel/preset-env']}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/scripts')));

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./scripts/**/*.js', gulp.series('js'));
});

gulp.task('build', gulp.series(['sass', 'js']));

gulp.task('default', gulp.series('watch'));
