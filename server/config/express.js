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

    if ("production" === env) {
        app.use(express.static(path.join(config.root, "dist/client")));
        app.set("appPath", path.join(config.root, "/dist/client"));
        app.set("rootPath", "/");
    } else {
        app.use(express.static(path.join(config.root, "client/app")));
        // app.use(express.static(path.join(config.root, 'dist/client')));
        app.set("appPath", fs.realpathSync("client/app"));
        app.set("bowerPath", "client/bower_components");
        app.set("rootPath", "/");

        app.use("/client/app", express.static(path.join(config.root, "client/app")));
        app.use("/app", express.static(path.join(config.root, "client/app")));
        app.use("/app/components/translations", express.static(path.join(config.root, "dist/app/components/translations")));
        app.use("/tmp", express.static(path.join(config.root, "tmp")));
        app.use("/app/bower_components", express.static(path.join(config.root, "client/bower_components")));
        app.use("/bower_components", express.static(path.join(config.root, "client/bower_components")));
        app.use("/client/bower_components", express.static(path.join(config.root, "client/bower_components")));
        app.use("/client/app/bower_components", express.static(path.join(config.root, "client/bower_components")));
        app.use("/client/assets", express.static(path.join(config.root, "client/assets")));
        app.use("/client/app/assets", express.static(path.join(config.root, "client/assets")));
        app.use("/assets", express.static(path.join(config.root, "client/assets")));
        app.use("/dist", express.static(path.join(config.root, "dist")));
    }
};
