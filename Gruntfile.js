'use strict';
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      robin: {
        options: {
          drop_console: true,
          report: 'gzip'
        },
        files: {
          'browser/robin.browser.min.js': ['browser/robin.browser.js']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js', 'robin.js', 'lib/**/*.js', 'test/**/*.js'
      ]
    },
    nodeunit: {
      all: ['test/**/test*.js'],
      options : {
        reporter: 'verbose'
      }
    },
    browserify: {
      robin: {
        src: ['robin.js'],
        dest: 'browser/robin.browser.js',
        options: {
          browserifyOptions: {
            basedir: '.'
          },
          bundleOptions: {
            standalone: 'Robin',
          }
        }
      }
    },
    compress: {
      robin: {
        files: {
          'browser/robin.browser.min.js.gzip': ['browser/robin.browser.min.js']
        },
        options: {
          mode: 'gzip',
          level: 9,
          pretty: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task.
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('unittest', function (file) {
    if (file) {
      var filePath;
      filePath = 'test/test' + file + '.js';
      console.log(filePath);
      grunt.config('nodeunit.all', [filePath]);
    }
    grunt.task.run('nodeunit');
  });
  grunt.registerTask('compile', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'nodeunit']);
  grunt.registerTask('browser', ['browserify:robin', 'uglify:robin', 'compress:robin']);

};
