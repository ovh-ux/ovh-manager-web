"use strict";
var gulp = require("gulp");

gulp.task("ngConstant:devApp", function () {
    gulp.start("grunt-ngconstant:devApp");
});

gulp.task("ngConstant:distUa", function () {
    gulp.start("grunt-ngconstant:distUa");
});

gulp.task("ngConstant:distLogin", function () {
    gulp.start("grunt-ngconstant:distLogin");
});

gulp.task("ngConstant:distBilling", function () {
    gulp.start("grunt-ngconstant:distBilling");
});

gulp.task("ngConstant:distUserAccount", function () {
    gulp.start("grunt-ngconstant:distUserAccount");
});

gulp.watch(["./Gruntfile.js", "./constants.config.js"], ["ngConstant:all"]);

gulp.task("ngConstant", function () {
    gulp.start("ngConstant:devApp");
    gulp.start("ngConstant:distUa");
    gulp.start("ngConstant:distLogin");
    gulp.start("ngConstant:distBilling");
    gulp.start("ngConstant:distUserAccount");
});

gulp.task("ngConstant:all", ["ngConstant"], function () {
    gulp.start("grunt-copy:dev");
});
