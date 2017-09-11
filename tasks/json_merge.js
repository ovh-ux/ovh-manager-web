module.exports = function(grunt) {
    'use strict';

    var _ = require('lodash');

    grunt.registerMultiTask('json_merge', 'merge many json', function() {


        var toWrite = {};
        this.files.forEach(function(f) {
            f.src.filter(function(filePath) {
                _.extend(toWrite, JSON.parse(grunt.file.read(filePath)));
            });

            grunt.file.write(f.dest, JSON.stringify(toWrite));
            //grunt.log.writeln('JSON Merged');
        });

    });
};
