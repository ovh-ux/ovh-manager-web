"use strict";
var gulp = require("gulp");

gulp.task("less", function () {
    gulp.start("grunt-less");
    gulp.watch(["./src/css/**/*.less"], ["grunt-less"]);
});
