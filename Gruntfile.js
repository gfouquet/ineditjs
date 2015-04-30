module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner: "/*\n" + " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" + " *  <%= pkg.description %>\n"
      + " *  <%= pkg.homepage %>\n" + " *\n" + " *  Made by <%= pkg.author.name %>\n"
      + " *  Under <%= pkg.licenses[0].type %> License\n" + " */\n"
    },

    bowerRequirejs: {
      target: {
        rjsConfig: 'demo/demo.js'
      }
    },

    preprocess: {
      umd: {
        src: 'src/umd/inedit.js',
        dest: 'lib/inedit.js'
      }
    },

    template: {
      options: {
        data: {
          version: '<%= pkg.version %>'
        }
      },
      umd: {
        src: '<%= preprocess.umd.dest %>',
        dest: '<%= preprocess.umd.dest %>'
      }
    },

    // Concat definitions
    concat: {
      dist: {
        src: ["src/jquery.boilerplate.js"],
        dest: "dist/jquery.boilerplate.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      src: "src/*.js"
    },

    jscs: {
      options: {
        config: ".jscsrc"
      },
      src: "src/*.js"
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["dist/jquery.boilerplate.js"],
        dest: "dist/jquery.boilerplate.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

  });
  grunt.registerTask("default", ["jshint", "jscs", "preprocess", "template"]);
  grunt.registerTask("demo", ["bowerRequirejs"]);
  // grunt.registerTask("default", [ "jshint", "concat", "uglify" ]);
  grunt.registerTask("travis", ["jshint"]);

};
