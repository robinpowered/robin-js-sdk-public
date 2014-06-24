'use strict';
/*global module:false*/

// Configure the grunt modules we want to use here
var gruntModules = [
  'grunt-contrib-nodeunit',
  'grunt-contrib-jshint',
  'grunt-contrib-copy',
  'grunt-contrib-clean',
  'grunt-mocha-test',
  'grunt-blanket',
  'grunt-jscs-checker'
];

module.exports = function(grunt) {

  // The `time-grunt` module provides a handy output of the run time of each
  // grunt task
  require('time-grunt')(grunt);

  // Load these necessary tasks
  gruntModules.forEach(function (gruntModule) {
    grunt.loadNpmTasks(gruntModule);
  });


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
    },
    jscs: {
      lib: {
        src: ['./robin.js', 'lib/**/*.js'],
        options: {
          config: '.jscs.json',
          reporter: 'console'
        }
      }
    },
    clean: {
      coverage: {
        src: ['coverage/']
      }
    },
    copy: {
      src: {
        src: ['robin.js', 'lib/**/*.js'],
        dest: 'coverage/'
      },
      test: {
        src: ['test/**/*.js'],
        dest: 'coverage/'
      }
    },
    blanket: {
      coverage: {
        src: ['coverage/'],
        dest: 'coverage/'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 1000
        },
        src: ['coverage/test/**/test*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'coverage/coverage.html'
        },
        src: ['coverage/test/**/test*.js']
      }
    },
  });

  // Default task.
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('style', ['jscs:lib']);
  grunt.registerTask('compile', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('test', ['clean', 'copy:src', 'blanket', 'copy:test', 'mochaTest']);
  grunt.registerTask('browser', ['browserify:robin', 'uglify:robin']);
  grunt.registerTask('build', ['lint', 'test', 'browser']);

};
