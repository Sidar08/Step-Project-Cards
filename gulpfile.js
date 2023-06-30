const gulp = require("gulp");
const clean = require("gulp-clean");
const cssMin = require("gulp-cssmin");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const jsminify = require("gulp-minify");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

const cleanDist = () => {
  return gulp.src("./dist").pipe(clean());
};

const generateMinJs = () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(jsminify())
    .pipe(gulp.dest("./dist/js"));
};

const generateImage = () => {
  return gulp.src("./src/img/**").pipe(gulp.dest("./dist/images"));
};

const style = () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(prefix({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
};

const generateMinCss = () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(concat("all.css"))
    .pipe(cssMin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));
};

const cleanCss = () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist"));
};

const prefixer = () => {
  gulp
    .src("src/app.css")
    .pipe(
      prefix({
        cascade: false,
      })
    )
    .pipe(gulp.dest("dist"));
};

gulp.task("cleanDist", cleanDist);
gulp.task("generateMinCss", generateMinCss);
gulp.task("generateMinJs", generateMinJs);
gulp.task("generateImage", generateImage);
gulp.task("style", style);
gulp.task("cleanCss", cleanCss);
gulp.task(
  "build",
  gulp.series(
    cleanDist,
    cleanCss,
    gulp.parallel(style, generateMinCss, generateMinJs, generateImage)
  )
);

gulp.task("prefix", prefix);

const build = () => {
  return gulp.series(
    cleanDist,
    cleanCss,
    gulp.parallel(style, generateMinCss, generateMinJs, generateImage)
  );
};


function watch() {
  gulp.watch("src/scss/*.scss", style);
  gulp.watch("./src/css/*.css", generateMinCss);
  gulp.watch("src/js/*.js", generateMinJs);
}

exports.default = build;
exports.dev = gulp.series(watch, build)


// проверить код 
