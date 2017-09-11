/*global dule*/
module.exports = function (grunt) {
    "use strict";
    grunt.registerMultiTask("build", "Generating build", function () {
        var  tmpl = grunt.file.read(this.data.src);

        grunt.file.write(this.data.dest, grunt.template.process(tmpl));
        grunt.log.writeln("Generated '" + this.data.dest + "' from '" + this.data.src + "'.");
    });
};
