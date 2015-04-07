module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'css/',
          cssDir: 'css',
          environment: 'production'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');


  grunt.registerTask('test', ['jshint','compass']);
  grunt.registerTask('default', ['jshint','compass']);

};