const gulp = require("gulp");
const requireDir = require("require-dir");

require("gulp-grunt")(gulp, { verbose: false });
requireDir("./gulp-scripts", { recurse: true });

gulp.task("default", ["dev"]);
