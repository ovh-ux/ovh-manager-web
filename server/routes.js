/**
 * Main application routes
 */
"use strict";
const path = require("path");
const proxy = require("request");
const errors = require("./components/errors");
const config = require("./config/environment");
const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const nicForSDEV = "";
const base64url = require("base64url");
const chalk = require("chalk");
const ctx = new chalk.constructor({level: 1});

module.exports = function (app) {
    // [SSO] authentication
    app.route(/^\/cgi-bin\/crosslogin.cgi/).get((req, res) => {
        var headers = req.headers;
        headers.host = "www.ovh.com";

        proxy.get({
            url: `https://www.ovh.com${req.url}`,
            headers,
            followRedirect: false
        }, (err, resp) => {
            if (err) {
                return res.status(500);
            }

            const cookies = resp.headers["set-cookie"];
            let parsedCookie;

            for (let i = cookies.length - 1; i >= 0; i--) {
                parsedCookie = cookie.parse(cookies[i]);

                if (parsedCookie.SESSION) {
                    res.cookie("SESSION", parsedCookie.SESSION, { path: "/", httpOnly: true });
                }
                if (parsedCookie.USERID) {
                    res.cookie("USERID", parsedCookie.USERID, { path: "/" });
                }
            }

            return res.redirect("/");
        });
    });

    // authentication

    app.route("/auth").get((req, res) => {
        const origin = req.headers.host;
        const headers = {
            contentType: "application/json"
        };
        const defaultErrorStatus = 500;

        headers.host = "www.ovh.com";

        proxy.post({
            url: "https://www.ovh.com/auth/requestDevLogin/",
            headers,
            followRedirect: false,
            gzip: true,
            json: {
                callbackUrl: `https://${origin}/auth-check`
            }
        }, (err, resp, data) => {
            if (err) {
                return res.status(defaultErrorStatus);
            }
            return res.redirect(data.data.url);
        });
    });

    app.route("/auth-check").get((req, res) => {
        const headers = req.headers;
        headers.host = "www.ovh.com";

        let cookies = [];

        try {
            cookies = JSON.parse(base64url.decode(req.query.data));

            if (Array.isArray(cookies.cookies)) {
                cookies.cookies.forEach((c) => {
                    const parsedCookie = cookie.parse(c);

                    if (parsedCookie.SESSION) {
                        res.cookie("SESSION", parsedCookie.SESSION, { path: "/", httpOnly: true });
                    }
                    if (parsedCookie.USERID) {
                        res.cookie("USERID", parsedCookie.USERID, { path: "/" });
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }

        res.redirect("/");
    });

    // APIv6
    app.route(/^\/(?:engine\/)?api(?:v6)/).all((req, res) => {
        const url = config.api.url + req.url.replace(/^\/(?:engine\/)?apiv6/, "");
        console.log(ctx.green("[APIV6]"), url);
        res.header("Access-Control-Allow-Origin", "*");
        req.pipe(proxy(url)).pipe(res);
    });

    // APIv7
    app.route(/^\/(?:engine\/)?apiv7/).all((req, res) => {
        const url = config.apiv7.url + req.url.replace(/^\/(?:engine\/)?apiv7/, "");
        console.log(ctx.green("[APIV7]"), url);
        res.header("Access-Control-Allow-Origin", "*");
        req.pipe(proxy(url)).pipe(res);
    });

    app.route(/^\/(?:engine\/)?2api/).all((req, res) => {
        const url = config.aapi.url + req.url.replace(/^\/(?:engine\/)?2api/, "");
        console.log(ctx.green("[2API]"), url);
        res.header("Access-Control-Allow-Origin", "*");

        proxy({
            method: req.method,
            url,
            json: true,
            body: req.body,
            headers: req.headers
        }, (err, resp, body) => {
            const defaultErrorStatus = 500;

            if (err && err.code === "ECONNREFUSED") {
                return req.pipe(proxy(config.aapi.prodUrl + req.url.replace(/^\/(?:engine\/)?2api/, ""))).pipe(res);
            }

            if (!resp) {
                return res.status(defaultErrorStatus).json(err);
            }

            return res.set(resp.headers).status(resp.statusCode).json(body);
        });
    });

    // The prod login page route should be redirect to the development login page
    app.route("/login/").get((req, res) => {
        res.redirect(301, "/auth.html");
    });

    app.use(express.static(app.get("appPath")));

    app.use(app.get("rootPath"), router);
};
