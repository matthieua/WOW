/*global module:false*/
module.exports = function(grunt) {
  mainTasks = ['coffee', 'growl:coffee', 'jasmine', 'growl:jasmine', 'uglify']

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      },
      options: {
        banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
        report: 'gzip'
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
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', mainTasks);

  // Travis CI task.
  grunt.registerTask('travis', ['coffee', 'jasmine']);
};
