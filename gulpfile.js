var gulp = require('gulp');
var gls = require('gulp-live-server');
var connect = require('gulp-connect');
var server;
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'build';

gulp.task('bowerjs', function() {
    gulp.src(plugins.mainBowerFiles({
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: 'bower.json'
        }
    }))
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('dist/public/js'))
});

gulp.task('bowercss', function() {
    gulp.src(plugins.mainBowerFiles({
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: 'bower.json'
        }
    }))
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('dist/public/css'))
    ;
});

gulp.task('html', function(){
    gulp.src(['src/client/**/*.html'] )
        .pipe(gulp.dest('dist/public/'));
});

gulp.task('lib', function(){
    gulp.src('src/client/js/*.js')
        .pipe(gulp.dest('dist/public/lib'));
});

gulp.task('img', function(){
    gulp.src(['src/client/images/*'])
        .pipe(gulp.dest('dist/public/css/images'));

});

gulp.task('config', function(){
    gulp.src(['src/client/configuration/*.json'])
        .pipe(gulp.dest('dist/public/configuration'));

});

gulp.task('css', function(){
    gulp.src(['src/client/css/*'])
        .pipe(gulp.dest('dist/public/css'));
});

gulp.task('full-clean', function(){
    gulp.src('dist')
        .pipe(plugins.clean())
});

gulp.task('clean', function(){
    gulp.src(['dist'])
});

gulp.task('lint', function(){
    gulp.src(['src/client/app/*.js', 'src/client/app/**/*.js'])
        .pipe(plugins.jslint())
        .pipe(plugins.jslint.reporter( 'stylish' ))
});

gulp.task('hint', function(){
    gulp.src(['src/client/app/*.js', 'src/client/app/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter( 'default' ))
});

gulp.task('modules', function(){
    gulp.src(['src/client/app/app.js',
        'src/client/router.js',
        'src/client/services/*/js',
        'src/client/app/**/*.js'])
        .pipe(plugins.concat('modules.js'))
        .pipe(plugins.uglify({mangle: false}))
        .pipe(gulp.dest('dist/public/js'));
});
gulp.task('server', function(){
    gulp.src(['src/server/**/*.js'])
        .pipe(gulp.dest('dist/server'));
    gulp.src(['src/index.js'])
        .pipe(gulp.dest('dist'))
});

gulp.task('app', function(){
    gulp.src(['src/app.js'])
        .pipe(gulp.dest('dist'))
});

gulp.task('packages', function () {
    gulp.src('package.json')
        .pipe(gulp.dest('dist'))
});

gulp.task('config', function(){
    gulp.src(['src/client/app/configuration/*.json'])
        .pipe(gulp.dest('dist/public/configuration'));
});

gulp.task('build', ['clean', 'html', 'modules', 'server', 'app', 'lib', 'css', 'img', 'config', 'packages'], function(){
    if(server){config
        server.stop();
    }
    else
    {
        server = gls.new('./dist/index.js');
    }
    gulp.run('webserver');

});

gulp.task('full-build', ['build', 'bowerjs', 'bowercss']);

gulp.task('webserver', function() {
    return server.start();
});

gulp.task('default', function(){
    gulp.run('build');
    gulp.watch(['./src/index.js', './src/client/site/app/**/*.js', './src/client/site/app/**/*.html','./src/client/admin/app/**/*.js','./src/client/site/app/**/*.html'], function(){
        gulp.run('build');
    })
});
