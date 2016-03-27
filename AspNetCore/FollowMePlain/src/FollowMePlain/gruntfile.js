/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    debugInfo: true
                },
                files: [{
                    expand: true,
                    cwd: './Content',
                    src: ['*.scss'],
                    dest: './wwwroot/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            styles: {
                files: [{
                    flatten: true,
                    cwd: 'Content',
                    dest: 'wwwroot/css',
                    expand: true,
                    src: ['**/*.{css,css.map}']
                }, {
                    flatten: true,
                    cwd: 'app',
                    dest: 'wwwroot/app',
                    expand: true,
                    src: ['**/*.js']
                }]
            }
        },
        ts: {
            default: {
                src: ["app/*.ts"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['sass', 'copy','ts']);
};