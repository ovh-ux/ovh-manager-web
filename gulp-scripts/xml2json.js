"use strict";
var gulp = require("gulp");
var assets = require("../Assets");

gulp.task("xml2json", function () {
    gulp.start("grunt-xml2json");
    gulp.watch(assets.resources.i18n, ["grunt-xml2json"]);
});
