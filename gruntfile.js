'use strict';
 
module.exports = function (grunt) {
 
    // configurable paths
    var yeomanConfig = {
        app: 'web',
        dist: 'dist'
      };
 
    grunt.initConfig({
        yeoman: yeomanConfig,
        concat: {
            dist: {
                src: [
                    yeomanConfig.app + '/vendor/bootstrap-sass/dist/js/bootstrap.js', // Bootstrap JS
                    yeomanConfig.app + '/js/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/dist/production.js',
            }
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/dist/production.js',
                dest: yeomanConfig.app + '/js/dist/production.min.js'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: yeomanConfig.app + '/styles/sass',
                    cssDir: yeomanConfig.app + '/styles',
                    importPath: yeomanConfig.app + '/vendor',
                    imagesDir: yeomanConfig.app + '/images',
                    javascriptsDir: yeomanConfig.app + '/scripts',
                    fontsDir: yeomanConfig.app + '/styles/fonts',
                }
            },
        },
        watch: {
            scripts: {
                files: [
                    yeomanConfig.app + '/js/*.js',
                    yeomanConfig.app + '/scripts/*.js',
                    yeomanConfig.app + '/scripts/*/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload:true
                },
            },
            css: {
                files: [yeomanConfig.app + '/styles/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            all: {
                files: 'index.html',
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    yeomanConfig.app + '/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    yeomanConfig.app + '/images/{,*/}*'
                ]
            }
        },
        connect: {
            options: {
                port: 9001,
                livereload:35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        yeomanConfig.app
                    ]
                }
            },
        },
    });
 
    // Where we tell Grunt we plan to use some plug-ins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
 
    // Where we tell w. 
    grunt.registerTask('default', ['connect:livereload','watch']);
 
};
