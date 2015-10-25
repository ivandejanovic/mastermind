module.exports = function(grunt) {
  'use strict';
  
  // Project configuration.
  grunt.initConfig({
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            'build/*'
          ]
        }]
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/*.js'
      ]
    },
    useminPrepare: {
      options: {
        dest: 'build'
      }/*,
      html: ['src/*.html']*/
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build/',
          src: 'manifest.webapp'
        },{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build/',
          src: 'css/**',
        },{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build/',
          src: 'images/**',
        },{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build/',
          src: 'js/**',
        },{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build/',
          src: 'views/**',
        }]
      }
    },
    usemin: {
      options: {
        dirs: ['build'],
        basedir: 'build',
      }/*,
      html: ['build/*.html']*/
    },
    compress: {
      main: {
        options : {
            archive : "deployment/mastermind.zip"
        },
        files : [
            { expand: true, src : "**/*", cwd : "build/" }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Build task(s).
  grunt.registerTask('build', ['clean', 'jshint', 'useminPrepare', /*'concat', 'uglify',*/ 'copy', 'usemin', 'compress']);
};
