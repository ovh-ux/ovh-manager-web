"use strict";
var gulp = require("gulp");

gulp.task("template", ["templateFile"], function () {
    gulp.start("grunt-copy:dev");
});

gulp.task("templateFile", ["grunt-template"]);

gulp.task("template:watch", ["template"], function () {
    gulp.watch(["./src/index.ejs"], ["template"]);
});
