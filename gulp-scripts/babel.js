"use strict";

var gulp = require("gulp");
var newer = require("gulp-newer");
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
var assets = require("../Assets");
var _ = require("lodash");

var concatPaths = [];
var modulesConfig = _.map(assets["EU"].modules, function (module) {
    var assetsModule = require("../bower_components/" + module + "/Assets.js");
    var paths = _.flatten([assetsModule.src.js].map(function (src) {
        return _.map(src, function (elt) {
            return "./bower_components/" + module + "/" + elt;
        });
    }));
    concatPaths = concatPaths.concat(paths);

    return {module: module, paths: paths};
});

var babelTasks = modulesConfig.map(function (moduleConfig) {
    gulp.task("babel:" + moduleConfig.module, function () {
    return gulp.src(moduleConfig.paths, { base : "./bower_components/" + moduleConfig.module })
        .pipe(newer("dist"))
        .pipe(plumber({
            errorHandler: function (err) {
                console.error(">>>>>>> BABEL ERROR: ", err);
            }
        }))
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
    });

    return "babel:" + moduleConfig.module;
});

gulp.task("babel:app", ["jshint-simple"], function () {
    gulp.src(assets.src.js.concat(["!<%= publicdir %>/js/app/libs/**/*.js"]), { base : "." })
        .pipe(newer("dist"))
        .pipe(plumber({
            errorHandler: function (err) {
                console.error(">>>>>>> BABEL ERROR: ", err);
            }
        }))
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("babel", babelTasks.concat(["babel:app"]));

gulp.task("babel:watch", ["jshint-simple", "babel"], function () {
    gulp.watch(assets.src.js.concat(concatPaths), ["jshint-simple", "babel"], function (e) {
        if (e.type === "added" || e.type === "deleted") {
            gulp.start("template");
        }
    });
});
