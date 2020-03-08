const gulp = require("gulp");
const sass = require("gulp-sass");
const concatCss = require("gulp-concat-css");
const browserSync = require("browser-sync");

function browser() {
  browserSync({
    server: {
      baseDir: "dist",
      serveStaticOptions: {
        extensions: ["html"]
    }
    },
    notify: false
  });
}

function scss() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass())
    .pipe(concatCss("dist/style.css"))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

exports.default = function() {
  browser();
  gulp.watch("./scss/**/*.scss", scss);
  gulp.watch("dist/*.html").on('change', browserSync.reload);
};
