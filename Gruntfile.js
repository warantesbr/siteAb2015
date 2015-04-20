module.exports = function (grunt) {
    'use strict';

    var date = (new Date()).valueOf().toString();

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                plugins: [
                    'assemble-contrib-permalinks',
                    'assemble-contrib-i18n'
                ],
                layout: "",
                flatten: true,
                helpers: ['./helpers/*.js'],
                partials: ['views/partials/*.hbs'],
                data: './routes/seo.json'
            },
            pages: {
                files: {
                    'build/': ['views/pages/*.html']
                }
            }
        },
        clean: {
            all: ['build/**/*.*', '!.htaccess']
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'public/',
                    src: ['**'],
                    dest: 'build/'
                }]
            }
        },
        replace: {
            build_replace: {
                options: {
                    patterns: [{
                        match: /(href|src)="([^"]+)"/g,
                        replacement: function (href) {
                            return href.replace(/(\.css|\.ico|\.js|\.jpg|\.png|\.gif|\.pdf)/, '.' + date + '$1');
                        }
                    }]
                },
                files: [{
                    src: ['build/*'],
                    dest: './'
                }]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['clean', 'assemble', 'copy', 'replace']);
};