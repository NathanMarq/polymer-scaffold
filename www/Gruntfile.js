module.exports = function(grunt) {

    var externalStyleFiles = grunt.file.readJSON('externalStyles.json'),
        externalScriptFiles = grunt.file.readJSON('externalScripts.json');

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            compile: {
                options: {
                    cleancss: true
                },
                files: { "public/styles/app.css" : externalStyleFiles.concat('public_src/styles/main.less') }
            }
        },


        uglify: {
            options: {
                report: 'min',
                mangle: true,
            },
            main: {
              files: {
                'public/scripts/app.js' : ['public/scripts/app.js'],
                'public/scripts/appDependencies.js' : ['public/scripts/appDependencies.js']
              }
            }
        },


        concat: {

            app: {
                files:{
                  'public/scripts/appDependencies.js' : externalScriptFiles,
                  'public/scripts/app.js' : 'public_src/scripts/**/*.js'
                },
                nonull: true
            }
        },

        vulcanize: {
          app: {
            options: {
              // csp: true,
              inline: true,
              strip: true,
              excludes: {
                imports: [
                  // we want to ignore this, since we're already building it in with vulcanize:polymer
                  "polymer.html"
                ]
              }
            },
            files: {
              'public/views/components/all-elements.html': 'public_src/main.html'
            },
          },
          polymer: {
            options: {
              inline: true
            },
            files: {
              'public/views/components/polymer.html': 'public_src/libs/bower_components/polymer/polymer.html'
            }
          }
        },

        // use tape to define our tests
        // this is mostly for the back-end code.
        tape: {
            options: {
              pretty: true,
              output: 'console'
            },
            files: [
                      'tests/routes/**/*.js'
            ]
        },

        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            less: {
                files: ['public_src/styles/**/*.less'],
                tasks: ['less']
            },
            htmlComponents: {
                files: [
                        'public/index.html',
                        'public/views/**/*.html',
                        'public_src/main.html',
                        'public_src/components/**/*.html'
                        ],
                tasks: [
                        'vulcanize:app',
                        'concat:app'
                        ]
            },

            jsComponents: {
                files: ['public_src/scripts/**/*.js'],
                tasks: [
                        'vulcanize:app',
                        'concat:app'
                        ]
            },

            externalFiles: {
              files: [
                      'externalScripts.json',
                      'externalStyles.json'
                      ],
              tasks: [
                      'less',
                      'concat:app'
                      ]
            },

            // watch back-end code:
            nodeTests: {
                files: ['server.js',
                        'routes/**/*.js',
                        'tests/routes/**/*.js'
                        ],
                tasks: ['tape']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-tape');
    grunt.loadNpmTasks('grunt-testling');

    grunt.registerTask('default', ['watch']);

    /*
    * Build Steps:
    * 1. compile less
    * 2. combine all html elements with vulcanize
    * 3. concat libraries and app js files
    * 5. Uglify all JS
    */

    grunt.registerTask('build', [ 'less',
                                  'vulcanize:polymer',
                                  'vulcanize:app',
                                  'concat:app',
                                  'uglify'
                                ]);

};
