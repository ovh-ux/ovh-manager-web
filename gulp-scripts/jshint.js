"use strict";
var gulp = require("gulp");
var assets = require("../Assets");
var runSequence = require("run-sequence");

gulp.task("jshint", function () {
    return runSequence(["grunt-copy:modules", "grunt-jshintBabel"]);
});

gulp.task("jshint-simple", function () {
    return runSequence(["grunt-copy:modules", "grunt-jshint"]);
});
