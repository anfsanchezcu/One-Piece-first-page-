const { options } = require("less");

module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare:'grunt-usemin'
    })
    grunt.initConfig({
        less:{
            dist:{
                files:{
                    "css/style2.css" : "css/style2.less"
                }
            }
            
        },
        sass:{
            dist:{
                files:[{
                    expand:true,
                    cwd:'css',
                    crs: ['*.scss'],
                    dest:'css',
                    ext:'.css'
                }]
            }
        },
        watch:{
            files:['css/*.less'],
            tasks:['less']
        },
        browserSync:{
            dev:{
                bsFiles:{  //browser files
                    src:[
                        'css/*.less',
                        '*.html',
                        'js/*.js'
                    ]
                }
            },
            options:{
                watchTask:true,
                server:{
                    baseDir:'./'  //directorio base para nuestro servidor
                }
            }
        },
        imagemin:{
            dynamic:{
                files:[{
                    expand:true,
                    cwd:'./',
                    src: 'images/*.{png,gif,jpg,jpeg}',
                    dest:'dist/'
                }]
            }
        },
        copy:{
            html:{
                files:[{
                    expand:true,
                    dot:true,
                    cwd:'./',
                    src:['*.html'],
                    dest:'dist'
                }]
            }
        },
        clean:{
            build:{
                src:['dist/']
            }
        },
        cssmin:{
            dist:{}
        },
        iglify:{
            dist:{}
        },
        filerev:{
            option:{
                encoding:'utf8',
                algorithm:'md5',
                length:20
            },
            release:{
                file:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        concat:{
            options:{
                separator:';'
            },
            dist:{}
        },
        useminPrepare:{
            foo:{
                dest:'dist',
                src:['index.html','walppapers.html', 'pesosajes.html', 'peliculas.html', 'about.html']
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig: function(context,block){
                                var generated = context.options.genereted;
                                generated.option ={
                                    keepSpecialComments:0,
                                    rebase:false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin:{
            html:['index.html','walppapers.html', 'pesosajes.html', 'peliculas.html', 'about.html'],
            options:{
                assetsDir:['dist', 'dist/css', 'dist/js']

            }
        }
    });
   
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('css',['less']);
    grunt.registerTask('img:compress',['imagemin']);
    grunt.registerTask('default',['browserSync', 'watch']);
    grunt.registerTask('build,'[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])
};