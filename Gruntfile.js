/*global module:false*/
module.exports = function(grunt) {
  mainTasks = ['coffee', 'growl:coffee', 'jasmine', 'growl:jasmine']

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    curl: {
      'lib/compiler-latest.zip': 'http://dl.google.com/closure-compiler/compiler-latest.zip'
    },
    unzip: {
      'lib/build': 'lib/compiler-latest.zip'
    },
    'closure-compiler': {
      dist: {
        js: 'dist/<%= pkg.name %>.js',
        jsOutputFile: 'dist/<%= pkg.name %>.min.js',
        closurePath: 'lib',
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
      }
    },
    coffee : {
      plugin : {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.coffee',
          dest: 'dist/',
          ext: '.js'
        }]
      },
      specs : {
        files: [{
          expand: true,
          cwd: 'spec/coffeescripts/',
          src: '*.coffee',
          dest: 'spec/javascripts/',
          ext: '.js'
        }]
      },
      helpers : {
        files: [{
          expand: true,
          cwd: 'spec/coffeescripts/helpers/',
          src: '*.coffee',
          dest: 'spec/javascripts/helpers/',
          ext: '.js'
        }]
      }
    },
    jasmine : {
      src     : ['spec/javascripts/libs/*.js', 'dist/<%= pkg.name %>.js'],
      options : {
        specs   : 'spec/javascripts/**/*.js',
        helpers : 'spec/javascripts/helpers/**/*.js'
      }
    },
    watch : {
      files: [
        'src/*',
        'spec/coffeescripts/**/*.coffee'
      ],
      tasks: mainTasks
    },
    growl : {
      coffee : {
        title   : 'CoffeeScript',
        message : 'Compiled successfully'
      },
      jasmine : {
        title   : 'Jasmine',
        message : 'Tests passed successfully'
      }
    }
  });

  // Lib tasks.
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('default', mainTasks);

  // Generate compiled & minified output.
  grunt.registerTask('dist', mainTasks.concat(['curl', 'unzip', 'closure-compiler']));

  // Travis CI task.
  grunt.registerTask('travis', ['coffee', 'jasmine']);
};
