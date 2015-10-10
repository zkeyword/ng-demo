var gulp        = require('gulp'),
	less        = require('gulp-less'),
	rjs         = require('gulp-requirejs'),
	minifyJs    = require('gulp-uglify'),
	minifyCss   = require('gulp-minify-css'),
	minifyHTML  = require('gulp-htmlmin'),
	minifyImg   = require('gulp-imagemin'),
	sprite      = require('gulp.spritesmith'),
	clean       = require('gulp-clean'),
	plumber     = require('gulp-plumber'),
	cache       = require('gulp-cache'),
	path       	= {
					dev: 'dev/',
					dest: 'dest/'
				};


//less
gulp.task('less', function () {
    gulp
		.src(path.dev+'styles/styles.less')
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifyCss({compatibility: 'ie7'}))
        .pipe(gulp.dest(path.dest+'styles'));
});

//requirejs
gulp.task('r', function() {

    rjs({
        name: '../main',
        baseUrl: path.dev+'/scripts',
		paths: {
			'angular' : '../lib/angular.min',
			'uiRouter' : '../lib/angular-ui-router.min',
			'angular-animate' : '../lib/angular-animate.min',
			'require' : '../lib/require',
			'template' : '../lib/template'
		},
		shim: {
			'angular': {
				exports: 'angular'
			},
			'angular-animate': {
				deps: ['angular']
			},
			'uiRouter': {
				deps: ['angular']
			}
		},
		mainConfigFile:path.dev+'/main.js',
        out: 'main.js',
		optimize:false
    })
	//.pipe(minifyJs())
    .pipe(gulp.dest(path.dest));

});

//html
gulp.task('html', function() {
	gulp.src(path.dev+'views/**/**.html')
        .pipe(minifyHTML({
            removeComments : true ,
            collapseWhitespace : true
        }))
        .pipe(gulp.dest(path.dest+'views'));
});

//清理图片
gulp.task('clean', [/*'clean:css', 'clean:js', */'clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:css', function() {
	gulp
		.src([
			path.dest+'styles/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
	gulp
		.src([
			path.dest+'scripts/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:html', function() {
	gulp
		.src([
			path.dest+'views/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesDefault', function() {
	gulp
		.src([
			path.dest+'images/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesSprite', function() {
	gulp
		.src([
			path.dest+'images/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});



//复制文件
gulp.task('copy', ['clean', 'copy:plugs', 'copy:js', 'copy:images']);

gulp.task('copy:plugs', function(){

});

gulp.task('copy:js', function(){
	gulp
		.src(path.dev+'lib/*')
		.pipe(gulp.dest(path.dest+'lib/'));
});

gulp.task('copy:images', function(){
	gulp
		.src(path.dev+'images/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(cache(minifyImg({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(path.dest+'images/'));
});


//sprite
gulp.task('sprite', ['sprite:png', 'sprite:jpg']);

//合并png
gulp.task('sprite:png', ['clean:imagesSprite'], function () {	
	var spriteData = gulp
						.src(path.dev+'images/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../images/sprite.png'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'images/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

//合并jpg
gulp.task('sprite:jpg', ['clean:imagesSprite'], function () {
	var spriteData = gulp
						.src(path.dev+'sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'sprite-jpg.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../images/sprite.jpg'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'images/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

//默认任务
gulp.task('default', ['clean', 'copy', 'html', 'sprite',  'r'], function(){
	
	//监听不合并图片
	gulp.watch(path.dev+'images/default/**', ['copy:images']);
	
	//监听sprite png
	gulp.watch(path.dev+'images/sprite/*.png', ['sprite:png']);
	
	//监听sprite jpg
	gulp.watch(path.dev+'images/sprite/*.jpg', ['sprite:jpg']);
	
	//监听js
    gulp.watch(path.dev+'scripts/**', ['r']);
	
    //监听less
    gulp.watch(path.dev+'styles/**', ['less']);
	
	//监听html
    gulp.watch(path.dev+'views/**', ['html']);
	
});