module.exports = function (grunt) {
    "use strict";
    const _ = require("lodash");
    const Async = require("async");
    const path = require("path");
    const Http = require("http");
    const Https = require("https");
    const assets = require("./Assets");
    let mode = grunt.option("mode") || "dev";

    const target = grunt.option("target") || "EU";
    const targetsAvailable = ["EU"];

    const filesJsModules = _.map(
        assets[target].modules,
        (module) => {
            const assetsModule = require(`./client/bower_components/${
                module
                }/Assets.js`);
            return {
                expand: true,
                cwd: `<%= bowerdir %>/${module}/src`,
                src: assetsModule.src.js.map((jsPath) => jsPath.replace("src/", "")),
                dest: "dist/app"
            };
        },
        []
    );

    function isProd () {
        return grunt.option("mode") === "prod" || grunt.option("type") !== undefined;
    }

    function copyFromEachModules (properties, dest) {
        return _.map(assets[target].modules, (module) => {
            const assetsModule = require(`./client/bower_components/${
                module
                }/Assets.js`);

            return {
                expand: true,
                cwd: `<%= bowerdir %>/${module}/src`,
                src: _(properties)
                    .map((property) => _.get(assetsModule, property))
                    .flatten()
                    .map((assetsPath) => assetsPath.replace("src/", ""))
                    .value(),
                dest
            };
        });
    }

    const basepath = grunt.option("base-path") || (isProd() ? "" : "../../");

    grunt.loadTasks("tasks");

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        // Config
        pkg: grunt.file.readJSON("package.json"),
        bower: grunt.file.readJSON("bower.json"),
        bowerdir: "client/bower_components",
        builddir: "tmp",
        publicdir: "client/app",
        distdir: isProd() ? "dist/client/" : "dist/",
        componentsdir: "client/app/components",

        // SWS
        swsProxyPath: "apiv6/",
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: "server/app.js"
                }
            },
            prod: {
                options: {
                    script: "dist/server/app.js"
                }
            }
        },
        open: {
            server: {
                url: "https://localhost:<%= express.options.port %>/client/app"
            }
        },
        prettier_eslint: {
            dist: {
                files: assets.src.js,
                dest: "."
            },
            options: {
                filePath: path.resolve("./.eslintrc.js")
            }
        },
        // Clean
        clean: {
            files: [
                "dist/app",
                "<%= builddir %>",
                "<%= distdir %>*",
                "dist",
                "<%= componentsdir %>/ovh-utils-angular/",
                "<%= publicdir %>/index.html",
                "<%= publicdir %>/auth.html",
                "*.war"
            ],
            modules: (function () {
                // IIFE to get all files of all targets
                const files = [];
                _.forEach(targetsAvailable, (tgt) => {
                    _.forEach(assets[tgt].modules, (module) => {
                        const assetsModule = require(`./client/bower_components/${
                            module
                            }/Assets.js`);
                        files.push(assetsModule.src.js);
                        files.push(assetsModule.src.css);
                        files.push(assetsModule.src.html);
                        files.push(assetsModule.src.images);
                        files.push(assetsModule.resources.i18n);
                    });
                });
                return _.flatten(files);
            })(),
            prod: ["dist/app"]
        },
        // JS Check
        eslint: {
            options: {
                ignorePattern: ["client/app/components/modal/**/*.js"],
                quiet: true, // Disable to see warning
                fix: true
            },
            target: assets.src.js
        },
        browserify: {
            options: {
                watch: false,
                plugin: ['browserify-hmr'],
                // uncomment these lines if you want to have source map files for debuging purpose
                // browserifyOptions: {
                //     debug: true
                // }
                transform: [
                    ['babelify', { presets: [["env", {
                      targets: {
                          browsers: ["last 2 versions", "ie 11"]
                      }
                    }]]
                    }
                    ],
                    ['stringify', {
                        appliesTo: { includeExtensions: ['.html'] }
                    }]
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: "client",
                    src: assets.src.js
                          .concat(["!<%= publicdir %>/js/app/libs/**/*"])
                          .map((jsPath) => jsPath.replace("client/", "")),
                    dest: "dist"
                }]
            },
            modules: {
                files: filesJsModules
            }
        },
        // ES6 SUPPORT
        // babel: {
        //     options: {
        //         presets: [["env", {
        //             targets: {
        //                 browsers: ["last 2 versions", "ie 11"]
        //             }
        //         }]]
        //     },
        //     modules: {
        //         files: filesJsModules
        //     },
        //     dist: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: "client",
        //                 src: assets.src.js
        //                     .concat(["!<%= publicdir %>/js/app/libs/**/*"])
        //                     .map((jsPath) => jsPath.replace("client/", "")),
        //                 dest: "dist"
        //             }
        //         ]
        //     }
        // },
        // Concatenation
        concat: {
            dist: {
                files: {
                    "<%= builddir %>/js/app.js": [
                        "<%= builddir %>/js/constants-*.js",
                        "!<%= builddir %>/js/constants-login.js",
                        assets.src.jsES6
                    ],
                    "<%= builddir %>/js/common.min.js": assets.common.js
                }
            }
        },
        // Obfuscate
        uglify: {
            options: {
                compress: {
                    drop_console: true,
                    warnings: true, // default false
                    unused: true, // default true
                    dead_code: true // default true
                }
            },
            dist: {
                // options: {
                //     banner: "/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
                // },
                files: {
                    "<%= distdir %>/js/app/bin/app.min.js": "<%= builddir %>/js/app.js"
                }
            },
            dev: {
                // options: {
                //     banner: "/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
                // },
                files: {
                    "<%= distdir %>/js/app/bin/app.min.js": "<%= builddir %>/js/app.js"
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    "<%= distdir %>/css/common.min.css": [assets.common.css],
                    "<%= distdir %>/css/app.min.css": [assets.src.css]
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= distdir %>/views/",
                        src: "**/*.html",
                        dest: "<%= distdir %>/views/"
                    },
                    {
                        expand: true,
                        cwd: "<%= distdir %>/",
                        src: "**/*.html",
                        dest: "<%= distdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= distdir %>/",
                        src: "*.html",
                        dest: "<%= distdir %>/"
                    }
                ]
            }
        },
        json_merge: {
            component_translations: {
                files: {
                    "<%= distdir %>/components/translations/Messages_cs_CZ.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_cs_CZ.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_de_DE.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_de_DE.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_en_CA.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_en_CA.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_en_GB.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_en_GB.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_en_US.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_en_US.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_es_ES.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_es_ES.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_es_US.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_es_US.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_fi_FI.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_fi_FI.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_fr_CA.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_fr_CA.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_fr_FR.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_fr_FR.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_it_IT.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_it_IT.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_lt_LT.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_lt_LT.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_nl_NL.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_nl_NL.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_pl_PL.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_pl_PL.json"
                    ],
                    "<%= distdir %>/components/translations/Messages_pt_PT.json": [
                        "<%= bowerdir %>/ovh-*/**/Messages_pt_PT.json"
                    ]
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= builddir %>",
                        src: "*.html",
                        dest: "<%= publicdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/angular-i18n/",
                        src: "*.js",
                        dest: "<%= publicdir %>/resources/angular/i18n/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ovh-utils-angular/bin/template/",
                        src: ["**/**.html", "**/**.css"],
                        dest: "<%= componentsdir %>/ovh-utils-angular/"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/ovh-ui-kit-bs/dist/fonts",
                        src: ["**/*"],
                        dest: "<%= publicdir %>/css/fonts"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/ovh-ui-kit-bs/dist/icons",
                        src: ["*"],
                        dest: "<%= publicdir %>/css/icons"
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= builddir %>/js/",
                        src: "common.min.js",
                        dest: "<%= distdir %>/js/app/bin/"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/ovh-ui-kit-bs/dist/fonts",
                        src: ["**/*"],
                        dest: "<%= distdir %>/css/fonts"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/ovh-ui-kit-bs/dist/icons",
                        src: ["*"],
                        dest: "<%= distdir %>/css/icons"
                    },
                    {
                        expand: true,
                        cwd: "<%= publicdir %>/images/",
                        src: "**/**/*",
                        dest: "<%= distdir %>/images/"
                    },
                    {
                        expand: true,
                        cwd: "<%= publicdir %>/",
                        src: "**/*.html",
                        dest: "<%= distdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= publicdir %>/",
                        src: "**/*.json",
                        dest: "<%= distdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= builddir %>",
                        src: "*.html",
                        dest: "<%= distdir %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= publicdir %>/resources/i18n/",
                        src: "**/*.json",
                        dest: "<%= distdir %>/resources/i18n/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/font-awesome/fonts/",
                        src: "*",
                        dest: "<%= distdir %>/fonts/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/angular-i18n/",
                        src: "*.js",
                        dest: "<%= distdir %>/resources/angular/i18n/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ovh-utils-angular/bin/template/",
                        src: ["**/**.html", "**/**.css"],
                        dest: "<%= distdir %>/components/ovh-utils-angular/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>",
                        src: [
                            "es5-shim/es5-shim.min.js",
                            "json3/lib/json3.min.js"
                        ],
                        dest: "<%= distdir %>/js/"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ovh-angular-actions-menu",
                        src: ["**"],
                        dest: "<%= distdir %>/bower_components/ovh-angular-actions-menu"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ovh-angular-sidebar-menu",
                        src: ["**"],
                        dest: "<%= distdir %>/bower_components/ovh-angular-sidebar-menu"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ovh-manager-webfont",
                        src: ["**"],
                        dest: "<%= distdir %>/bower_components/ovh-manager-webfont"
                    },
                    {
                        expand: true,
                        cwd: "<%= bowerdir %>/ckeditor",
                        src: ["**"],
                        dest: "<%= distdir %>/bower_components/ckeditor"
                    },
                    {
                        expand: true,
                        cwd: "client/assets",
                        src: ["**"],
                        dest: "<%= distdir %>/assets"
                    },
                    copyFromEachModules(["src.images"], "<%= distdir %>/assets")
                ]
            },
            modulesjs: {
                files: copyFromEachModules(["src.js"], "client/app")
            },
            moduleshtml: {
                files: copyFromEachModules(["src.html"], "client/app")
            },
            templates: {
                files: copyFromEachModules(["src.html"], "dist/app")
            },
            assets: {
                files: copyFromEachModules(["src.images"], "client/assets")
            },
            resources: {
                files: copyFromEachModules(["resources.i18n"], "client/app")
            },
            css: {
                files: copyFromEachModules(["src.css"], "client/app")
            }
        },
        // ejs to html
        template: {
            dist: {
                src: "<%= publicdir %>/index.ejs",
                dest: "<%= publicdir %>/index.html",
                variables () {
                    return {
                        prodMode: mode === "prod",
                        basepath,
                        commonModuleBasePath: "https://www.ovh.com/manager/dedicated",
                        modules: assets.modules,
                        constants: grunt.file.expand([
                            `${grunt.config("builddir")}/js/constants-*.js`,
                            `!${
                                grunt.config("builddir")
                                }/js/constants-login.js`
                        ]),
                        commonJsFiles: grunt.file.expand(assets.common.js),
                        jsFiles: grunt.file.expand(assets.src.jsES6),
                        commonCss: grunt.file.expand(assets.common.css),
                        css: grunt.file.expand(assets.src.css),
                        target
                    };
                }
            }
        },
        // Less
        less: {
            development: {
                options: {
                    paths: ["client", "client/app/css/less/"],
                    plugins: [
                        require("less-plugin-remcalc")
                    ]
                },
                files: {
                    "client/app/css/main.css": "client/app/css/source.less"
                }
            }
        },
        // sass
        sass: {
            options: {
                outputStyle: "expanded"
            },
            dist: {
                files: {
                    "client/app/css/main-scss.css": "client/app/css/source.scss"
                }
            }
        },
        xml2json: {
            files: assets.resources.i18n
        },
        replace: {
            sourcemap: {
                src: ["<%= builddir %>/js/common.min.js"],
                overwrite: true,
                replacements: [
                    {
                        from: "//@ sourceMappingURL=jquery.min.map",
                        to: ""
                    },
                    {
                        from: "//@ sourceMappingURL=filesize.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=angular.min.js.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=angular-route.min.js.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=angular-sanitize.min.js.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=angular-cookies.min.js.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=angular-messages.min.js.map",
                        to: ""
                    },
                    {
                        from: "//# sourceMappingURL=raven.min.js.map",
                        to: ""
                    }
                ]
            }
        },
        protractor: {
            options: {
                configFile: "protractor.conf.js"
            },
            browser: {
                options: {
                    args: {
                        browser: grunt.option("browser") || "phantomjs",
                        suite: grunt.option("suite") || "full"
                    }
                }
            }
        },
        // Auto Build
        watch: {
            i18nmodules: {
                files: (function () {
                    const files = [];
                    _.forEach(assets[target].modules, (module) => {
                        const assetsModule = require(`./client/bower_components/${
                            module
                            }/Assets.js`);
                        _.forEach(assetsModule.resources.i18n, (val) => {
                            files.push(
                                `./client/bower_components/${module}/${val}`,
                                `!${val}`
                            );
                        });
                    });
                    return _.flatten(files);
                })(),
                options: {
                    spawn: false,
                    livereload: true
                },
                tasks: ["copy:resources", "xml2json"]
            },
            i18n: {
                files: assets.resources.i18n,
                options: {
                    spawn: false,
                    livereload: true
                },
                tasks: ["xml2json"]
            },
            htmlmodules: {
                files: (function () {
                    const files = [];
                    _.forEach(assets[target].modules, (module) => {
                        const assetsModule = require(`./client/bower_components/${module}/Assets.js`);
                        _.forEach(assetsModule.src.html, (val) => {
                            files.push(
                                `./client/bower_components/${module}/${val}`,
                                `!${val}`
                            );
                        });
                    });

                    return _.flatten(files);
                })(),
                options: {
                    spawn: false,
                    livereload: true
                },
                tasks: ["copy:moduleshtml"]
            },
            // js: {
            //     files: assets.src.js,
            //     tasks: ["browserify:dist", "force:eslint"],
            //     options: {
            //         spawn: false,
            //         livereload: true
            //     }
            // },
            // jsmodules: {
            //     files: (function () {
            //         const files = [];
            //         _.forEach(assets[target].modules, (module) => {
            //             const assetsModule = require(`./client/bower_components/${
            //                 module
            //                 }/Assets.js`);
            //             _.forEach(assetsModule.src.js, (val) => {
            //                 files.push(
            //                     `./client/bower_components/${
            //                         module
            //                         }/${
            //                         val}`,
            //                     `!${val}`
            //                 );
            //             });
            //         });
            //         return _.flatten(files);
            //     })(),
            //     tasks: ["browserify:modules", "force:eslint"],
            //     options: {
            //         spawn: false,
            //         livereload: true
            //     }
            // },
            css: {
                files: (function () {
                    const files = [assets.src.css];
                    _.forEach(assets[target].modules, (module) => {
                        const assetsModule = require(`./client/bower_components/${
                            module
                            }/Assets.js`);
                        _.forEach(assetsModule.src.css, (val) => {
                            files.push(
                                `./client/bower_components/${
                                    module
                                    }/${
                                    val}`,
                                `!${val}`
                            );
                        });
                    });
                    return _.flatten(files);
                })(),
                tasks: ["copy:css"],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            less: {
                files: assets.src.less.concat("./client/app/components/**/*.less"),
                tasks: ["less"],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            scss: {
                files: assets.src.scss,
                tasks: ["sass"],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        // To release
        bump: {
            options: {
                pushTo: "origin",
                files: ["package.json", "bower.json"],
                updateConfigs: ["pkg", "bower"],
                commitFiles: ["-a"]
            }
        },
        ngAnnotate: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "dist",
                        src: "**/*.js",
                        dest: "dist"
                    }
                ]
            }
        }
    });
    // On watch events configure jshint:all to only run on changed file
    grunt.event.on("watch", (action, filepath, watchName) => {
        switch (watchName) {
        case "js":
            updateEslint(filepath);
            grunt.config("babel.dist.files", [
                {
                    expand: true,
                    cwd: "client",
                    src: filepath.replace("client/", ""),
                    dest: "dist"
                }
            ]);
            break;
        case "jsmodules":
            var rxCwd = /.+bower_components\/ovh-module-.*\/src\//;
            var cwdMatch = filepath.match(rxCwd);
            updateEslint(filepath);
            grunt.config("babel.modules.files", [
                {
                    expand: true,
                    cwd: Array.isArray(cwdMatch) ? cwdMatch[0] : null,
                    src: filepath.replace(rxCwd, ""),
                    dest: "dist/app"
                }
            ]);
            break;
        case "ngAnnotate":
            grunt.config("ngAnnotate.dist.files", [
                {
                    expand: true,
                    cwd: "dist",
                    src: filepath.replace("dist/", ""),
                    dest: "dist"
                }
            ]);
            break;
        case "htmlmodules":
            var rxCwd = /.+bower_components\/ovh-module-.*\/src\//;
            var cwdMatch = filepath.match(rxCwd);

            grunt.config("copy.moduleshtml.files", [{
                expand: true,
                cwd: Array.isArray(cwdMatch) ? cwdMatch[0] : null,
                src: filepath.replace(rxCwd, ""),
                dest: "client/app"
            }]);
            break;
        default:
            break;
        }
    });

    function updateEslint (filepath) {
        grunt.config("eslint.target", filepath);
    }

    function pingUrl (toPing, next) {
        let getter;
        grunt.verbose.writeln("ping url \"%s\"", toPing.url);

        if (/^https/.test(toPing.url)) {
            getter = Https;
        } else {
            getter = Http;
        }

        getter
            .get(toPing.url, (res) => {
                grunt.log.write(".");
                toPing.result = res.statusCode;
                if (res.statusCode === 301) {
                    grunt.log.writeln(" ");
                    grunt.log.warn(
                        "%s | \"%s\" -> %s",
                        toPing.path,
                        toPing.url,
                        res.statusCode
                    );
                    grunt.log.warn(
                        " please update to \"%s\"",
                        res.headers.location
                    );
                } else if (res.statusCode > 399) {
                    grunt.log.writeln(" ");
                    grunt.log.error(
                        "%s | \"%s\" -> %s",
                        toPing.path,
                        toPing.url,
                        res.statusCode
                    );
                }
                next();
            })
            .on("error", (e) => {
                grunt.log.writeln("|");
                grunt.log.warn("%s | \"%s\" -> Error.", toPing.path, toPing.url);
                next(e);
            });
    }
    // Used for delaying livereload until after server has restarted
    grunt.registerTask("wait", function () {
        grunt.log.ok("Waiting for server reload...");

        const done = this.async();

        setTimeout(() => {
            grunt.log.writeln("Done waiting!");
            done();
        }, 1500);
    });
    grunt.registerTask("test", (target, option) => {
        if (target === "e2e") {
            // Check if it's a remote test
            if (
                process.env.E2E_BASE_URL &&
                !/^https?:\/\/localhost/.test(process.env.E2E_BASE_URL)
            ) {
                option = "remote";
            }

            if (option === "remote") {
                return grunt.task.run(["protractor"]);
            }

            // not implemented, plz use remote
            return grunt.task.run(["buildDev", "protractor"]);

        }
        return grunt.task.run(["force:eslint"]);

    });
    grunt.registerTask("default", ["build"]);
    grunt.registerTask("jshintBabel", ["force:eslint", "browserify"]);
    grunt.registerTask("buildProd", [
        "clean",
        "force:eslint",
        "browserify",
        "ngAnnotate:dist",
        "copy:modulesjs",
        "copy:moduleshtml",
        "copy:css",
        "copy:assets",
        "copy:resources",
        "less",
        "sass",
        "concat",
        "replace",
        "uglify",
        "cssmin",
        "xml2json",
        "json_merge",
        "template",
        "copy:dist",
        "htmlmin",
        "clean:prod"
    ]);

    grunt.registerTask("buildDev", [
        "clean",
        "force:eslint",
        "browserify",
        "ngAnnotate:dist",
        "copy:modulesjs",
        "copy:moduleshtml",
        "copy:css",
        "copy:assets",
        "copy:resources",
        "less",
        "sass",
        "xml2json",
        "json_merge",
        "template",
        "copy:dev",
        "express:dev",
        "wait",
        "watch"
    ]);
    /*
     * --mode=prod
     * --mode=dev
     */
    grunt.registerTask("build", "Prod build", () => {
        if (!~targetsAvailable.indexOf(target)) {
            grunt.fail.warn(
                `Wrong target. Please choose one of them: ${targetsAvailable}`
            );
        }

        grunt.log.subhead(`You build in ${mode} mode`);
        grunt.log.subhead(`For target ${target}`);
        switch (mode) {
        case "dev":
            grunt.task.run("buildDev");
            break;
        case "prod":
            grunt.task.run("buildProd");
            break;
        default:
            grunt.verbose.or
                .write(`You try to build in a weird mode [${mode}]`)
                .error();
            grunt.fail.warn("Please try with --mode=dev|prod");
        }
    });

    grunt.registerTask("serve", ["build", "watch"]);

    /*
     * --type=patch
     * --type=minor
     * --type=major
     */
    grunt.registerTask("release", "Release", () => {
        const type = grunt.option("type");
        if (isProd()) {
            mode = "prod";
            grunt.task.run([
                `bump-only:${type}` /* , "changelog"*/,
                "bump-commit"
            ]);
        } else {
            grunt.verbose.or
                .write(
                    `You try to release in a weird version type [${type}]`
                )
                .error();
            grunt.fail.warn("Please try with --type=patch|minor|major");
        }
    });

    grunt.registerTask("prettier-eslint", "My prettier eslint task", (
        done
    ) => {
        // Force task into async mode and grab a handle to the "done" function.
        // var done = this.async();
        // Run some sync stuff.
        grunt.log.writeln("Processing task prettier eslint...");

        // And some async stuff.
        setTimeout(() => {
            grunt.log.writeln("All done!");
            done();
        }, 1000);
    });
};
