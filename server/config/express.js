/**
 * Express configuration
 */
"use strict";

var express = require("express");
var path = require("path");
var config = require("./environment");
var fs = require("fs");

module.exports = function (app) {
    var env = app.get("env");

    app.use(require("connect-livereload")());
    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");

    app.use(express.static(path.join(config.root, "dist/client")));
    app.set("appPath", path.join(config.root, "/dist/client"));
    app.set("rootPath", "/");

    if (env !== "production") {
        app.use("/node_modules", express.static(path.join(config.root, "node_modules")));
    }
};
