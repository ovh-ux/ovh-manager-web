"use strict";
var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("dev", function () {
    runSequence(
        "babel:watch", "copy:EU", "ngConstant:all", "ngAnnotate", "less", "xml2json", "template", "template:watch", "copy:dev",
        "copy:modules",
        "template",
        "copy:dev"
    );
});
