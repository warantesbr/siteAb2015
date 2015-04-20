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
                i18n: {
                    languages: [ "en", "pt-BR" ],
                    templates: ["views/pages/*.hbs"]
                },
                permalinks: {
                    structure: ':build_filename',
                    patterns: [
                        {
                            pattern: ':build_filename',
                            replacement: function () {
                                var original_file_name = this.filename.replace("-" + this.language + this.ext, this.ext);

                                if ( this.language == 'en' ) return ":language/" + original_file_name;
                                return original_file_name;
                            }
                        }
                    ]
                },
                layout: "",
                flatten: true,
                helpers: ['./helpers/*.js'],
                partials: ['views/partials/*.hbs'],
                data: 'data/**/*.{json,yml}'
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
                    src: ['build/**/*.html'],
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