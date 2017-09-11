"use strict";
var gulp = require("gulp");
var assets = require("../Assets");
var newer = require("gulp-newer");
var _ = require("lodash");
var buildDir = "tmp";
var publicDir = "src";
var bowerDir = "bower_components";

var files = _.flatten(_.map(assets["EU"].modules, function (module) {
    var assetsModule = require("../bower_components/" + module + "/Assets.js");
    return [assetsModule.src.css, assetsModule.src.js, assetsModule.src.html, assetsModule.src.images, assetsModule.resources.i18n].map(function (src) {
        return _.map(src, function (elt) {
            return "./bower_components/" + module + "/" + elt;
        });
    });
}));

gulp.task("copy:modules", ["grunt-copy:modules"], function () {
    gulp.watch(files, ["grunt-copy:modules"]);
});

gulp.task("copy:EU", ["grunt-copy:EU"], function () {
    gulp.watch(["./bower_components/ovh-noVNC/**/*"], ["grunt-copy:EU"]);
});

gulp.task("copy:dev", function () {
    gulp.src([buildDir, "*.html"].join("/"))
        .pipe(newer(publicDir))
        .pipe(gulp.dest(publicDir));

    gulp.src([bowerDir, "angular-i18n", "*.js"].join("/"))
        .pipe(newer([publicDir, "resources/angular/i18n/"].join("/")))
        .pipe(gulp.dest([publicDir, "resources/angular/i18n/"].join("/")));

    gulp.src(["/ovh-utils-angular/bin/template/**/*.html", "/ovh-utils-angular/bin/template/**/*.css"])
        .pipe(newer([publicDir, "js/ovh-utils-angular/"].join("/")))
        .pipe(gulp.dest([publicDir, "js/ovh-utils-angular/"].join("/")));
});
