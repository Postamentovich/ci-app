const gulp = require('gulp')
const sass = require('gulp-sass')
const concatCss = require('gulp-concat-css')
const browserSync = require('browser-sync')

function browser() {
  browserSync({
    server: {
      baseDir: 'client/dist',
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    notify: false,
  })
}

function scss() {
  return gulp
    .src('.client/scss/**/*.scss')
    .pipe(sass())
    .pipe(concatCss('client/dist/style.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
}

exports.default = () => {
  browser()
  gulp.watch('.client/scss/**/*.scss', scss)
  gulp.watch('client/dist/*.html').on('change', browserSync.reload)
}
