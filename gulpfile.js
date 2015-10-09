var gulp        = require('gulp'),
	less        = require('gulp-less'),
	rjs         = require('gulp-requirejs'),
	jshint      = require('gulp-jshint'),
	//maps        = require('gulp-sourcemaps'),
	minifyJs    = require('gulp-uglify'),
	minifyCss   = require('gulp-minify-css'),
	minifyHTML  = require('gulp-htmlmin'),
	minifyImg   = require('gulp-imagemin'),
	sprite      = require('gulp.spritesmith'),
	clean       = require('gulp-clean'),
	plumber     = require('gulp-plumber'),
	concat      = require('gulp-concat'),
	tmodjs      = require('gulp-tmod'),
	cache       = require('gulp-cache'),
	path       	= {
					dev: 'app/scripts2/',
					dest: 'app/scripts2-dest/'
				};


//less
gulp.task('less', function () {
    gulp
		.src(path.dev+'less/styles.less')
        //.pipe(maps.init())
		.pipe(plumber(function(error){
			console.log(error);
			console.log('--------------------------  less Syntax Error! --------------------------');
		}))
		.pipe(less())
		.pipe(minifyCss({compatibility: 'ie7'}))
		//.pipe(maps.write('./'))
        .pipe(gulp.dest(path.dest+'css'));
});


//jshint
gulp.task('jshint', function() {
	gulp
		.src(path.dev+'js/core/drag.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));	
})


//requirejs
gulp.task('r', function() {

    rjs({
        name: '../main',
        baseUrl: path.dev+'lib/',
		paths: {
			'angular' : 'angular.min',
			'uiRouter' : 'angular-ui-router.min',
			'angular-animate' : 'angular-animate.min',
			'require' : 'require',
		},
		mainConfigFile:path.dev+'/main.js',
        out: 'main.js',
		optimize:false
    })
	//.pipe(minifyJs())
	.pipe(maps.write('./'))
    .pipe(gulp.dest(path.dest));

});


//tmod.js
gulp.task('tmod', function() {
	gulp.src(path.dev + '/tpl/**/*.html')
		.pipe(tmodjs({
			base:  path.dev + 'tpl',
			combo: true,
			output: path.dev + 'js/app/'
		}));
});

//
gulp.task('html', function() {
	gulp.src( paths.htmlFiles , { base : REQUIREJS } )
        //.pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
});

//清理图片
gulp.task('clean', [/*'clean:css', 'clean:js', */'clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:css', function() {
	gulp
		.src([
			path.dest+'css/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
	gulp
		.src([
			path.dest+'js/**/*'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesDefault', function() {
	gulp
		.src([
			path.dest+'img/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesSprite', function() {
	gulp
		.src([
			path.dest+'img/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});



//复制文件
gulp.task('copy', ['clean', 'copy:plugs', 'copy:js', 'copy:images']);

gulp.task('copy:plugs', function(){

});

gulp.task('copy:js', function(){
	gulp
		.src(path.dev+'js/lib/*')
		.pipe(gulp.dest(path.dest+'js/lib/'));
});

gulp.task('copy:images', function(){
	gulp
		.src(path.dev+'img/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(cache(minifyImg({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(path.dest+'img/'));
});


//sprite
gulp.task('sprite', ['sprite:png', 'sprite:jpg']);

//合并png
gulp.task('sprite:png', ['clean:imagesSprite'], function () {	
	var spriteData = gulp
						.src(path.dev+'img/sprite/**.png')
						.pipe(sprite({
							imgName: 'sprite.png',
							cssName: 'sprite-png.css',
							cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.png'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'img/'));
		
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
							imgPath: '../img/sprite.jpg'
						}));
		spriteData
			.img
			.pipe(minifyImg({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(path.dest+'img/'));
		
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});


gulp.task('default', ['clean', 'copy', 'sprite',  'r'], function(){
	
	//监听不合并图片
	gulp.watch(path.dev+'img/default/*/*.*', ['copy:images']);
	
	//监听sprite png
	gulp.watch(path.dev+'img/sprite/*.png', ['sprite:png']);
	
	//监听sprite jpg
	gulp.watch(path.dev+'img/sprite/*.jpg', ['sprite:jpg']);
	
	//监听tpl
	gulp.watch(path.dev+'tpl/*/*.*', ['tmod']);
		
	//监听js
    gulp.watch(path.dev+'js/*/*.*', ['r']);
	
    //监听less
    gulp.watch(path.dev+'less/*/*.*', ['less']);
	
});