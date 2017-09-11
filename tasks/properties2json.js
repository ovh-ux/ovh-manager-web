module.exports = function (grunt) {
    var _ = require('lodash');

    "use strict";
    grunt.registerMultiTask('properties2json', 'Convert .properties files to json', function () {
        var fs = require('fs');

        /** Unescape unicode chars ('\u00e3') */
        function unescapeUnicode (str) {
            // unescape unicode codes
            var codes = [];
            var code = parseInt(str.substr(2), 16);
            if (code >= 0 && code < Math.pow(2, 16)) {
                codes.push(code);
            }
            // convert codes to text
            var unescaped = '';
            for (var i = 0; i < codes.length; ++i) {
                unescaped += String.fromCharCode(codes[i]);
            }
            return unescaped;
        }

        var parseData = function (data) {
            var i18n = {},
                    parameters = data.split(/\n/),
                    unicodeRE = /(\\u.{4})/ig,
                    i = 0, pair, name, value, s, unicodeMatches, u;

            for (i; i < parameters.length; i++) {

                parameters[i] = parameters[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');

                if (parameters[i].length > 0 && parameters[i].match("^#") != "#") {

                    pair = parameters[i].split('=');

                    if (pair.length > 0) {

                        name = unescape(pair[0]).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        value = pair.length == 1 ? "" : pair[1];

                        while (value.match(/\\$/) == "\\") {
                            value = value.substring(0, value.length - 1);
                            value += parameters[++i].replace(/\s\s*$/, '');
                        }

                        for (s = 2; s < pair.length; s++) {
                            value += '=' + pair[s];
                        }
                        value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

                        unicodeMatches = value.match(unicodeRE);
                        if (unicodeMatches) {
                            for (u = 0; u < unicodeMatches.length; u++) {
                                value = value.replace(unicodeMatches[u], unescapeUnicode(unicodeMatches[u]));
                            }
                        }
                        i18n[name] = value;
                    }
                }
            }
            return JSON.stringify(i18n);
        };

        var files = grunt.file.expand(this.data);


        grunt.log.subhead('Transforming properties into json');
        // Write all files
        files.forEach(function (filepath) {
            var newfilepath = filepath.replace(/\.properties$/, '.json');
            grunt.file.write(newfilepath, parseData(grunt.file.read(filepath)));
        });

        // Extend missing key
        // load english load french
        var regExpEnGB = new RegExp(/Messages_en_GB\.json$/g);
        var regExpFrFR = new RegExp(/Messages_fr_FR\.json$/g);
        var regExpOther = new RegExp(/Messages_en_GB\.json$|Messages_fr_FR\.json$/g);
        var memoize = {};

        this.data.forEach(function (d) {

            var path = d.replace(/\.properties/g, '.json');
            var jsonFiles = grunt.file.expand(path);

            var jsonEnGB = jsonFiles.filter(function (src) {
                return src.match(regExpEnGB);
            });

            var jsonFrFR = jsonFiles.filter(function (src) {
                return src.match(regExpFrFR);
            });

            grunt.log.subhead('Extending translation');

            var jsonOther = jsonFiles.filter(function (src) {
                return !src.match(regExpOther);
            }).map(function (filePath) {

                var formattedPath = filePath.replace(/_.._..\.json$/g, ''),
                    memoizePathEn = 'enGB' + formattedPath,
                    memoizePathFr = 'frFR' + formattedPath;

                //Memorize data en
                if (!memoize[memoizePathEn]) {
                    jsonEnGB.filter(function (src) {
                        return formattedPath === src.replace(/_.._..\.json$/g, '');
                    }).map(function (p) {
                        memoize[memoizePathEn] = grunt.file.readJSON(p);
                    })[0];
                }

                //Memorize data fr
                if (!memoize[memoizePathFr]) {
                    jsonFrFR.filter(function (src) {
                        return formattedPath === src.replace(/_.._..\.json$/g, '');
                    }).map(function (p) {
                        memoize[memoizePathFr] = grunt.file.readJSON(p);
                    })[0];
                }

                var dataToMerge = _.merge(memoize[memoizePathFr], memoize[memoizePathEn]),
                    data = grunt.file.readJSON(filePath);

                grunt.file.write(filePath, JSON.stringify(_.merge(dataToMerge, data)));
            });
        });
    });
};
