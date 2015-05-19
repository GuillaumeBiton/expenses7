/*jslint node: true*/
(function () {
    
    'use strict';
    
    var gulp = require('gulp'),
        jade = require('gulp-jade'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        deploy = require('gulp-gh-pages'),
        
        paths = {
            libraries: {
                scripts : [
                    'node_modules/framework7/dist/js/framework7.min.js',
                    'node_modules/framework7/dist/js/framework7.min.js.map',
                    'node_modules/pouchdb/dist/pouchdb.min.js'
                ],
                styles : [
                    'node_modules/framework7/dist/css/framework7.min.css'
                ]
            },
            source : {
                root: 'src',
                templates: 'src/**/*.jade',
                scripts: 'src/**/*.js',
                styles: 'src/**/*.css'
            },
            dist: {
                root: 'dist',
                libraries: 'dist/lib'
            }
        };
    
    // Copy dependencies to dist folder
    gulp.task('libraries', function () {
        return gulp.src(paths.libraries.scripts.concat(paths.libraries.styles))
			.pipe(gulp.dest(paths.dist.libraries));
    });
    
    // Render jade templates into dist folder
    gulp.task('templates', function () {
        return gulp.src(paths.source.templates)
            .pipe(jade())
            .pipe(gulp.dest(paths.dist.root));
    });
    
    // Copy script files to dist folder
    gulp.task('scripts', function () {
        return gulp.src(paths.source.scripts).pipe(gulp.dest(paths.dist.root));
    });
    
    // Copy style files to dist folder
    gulp.task('styles', function () {
        return gulp.src(paths.source.styles).pipe(gulp.dest(paths.dist.root));
    });
    
    // Generate distribution
    gulp.task('dist', [ 'libraries', 'templates', 'scripts', 'styles' ]);
    
    // Launch a local webserver for testing
    gulp.task('server', [ 'dist' ], function () {
		return connect.server({
			root: [ paths.dist.root ],
			livereload: true
		});
	});
	
    // Reload task
    gulp.task('reload', function () {
        return gulp.src(paths.dist.root).pipe(connect.reload());
    });
    
    // Open default web browser to app
	gulp.task('open', [ 'server' ], function () {
		return gulp.src(paths.dist.root + '/index.html').pipe(open('', { url: 'http://localhost:8080' }));
	});
    
    // Deploy dist folder to github gh-pages
    gulp.task('deploy', ['dist'], function () {
        return gulp.src(paths.dist.root + '/**/*')
            .pipe(deploy());
    });
    
    // Watching files for changes 
    gulp.task('watch', function () {
		gulp.watch(paths.libraries.scripts.concat(paths.libraries.styles), [ 'libraries', 'reload' ]);
		gulp.watch(paths.source.templates, [ 'templates', 'reload' ]);
		gulp.watch(paths.source.scripts, [ 'scripts', 'reload' ]);
		gulp.watch(paths.source.styles, [ 'styles', 'reload' ]);
	});
    
    // Define default gulp tasks
    gulp.task('default', [ 'watch', 'open' ]);
    
}());