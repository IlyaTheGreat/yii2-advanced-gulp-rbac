"use strict";

var gulp          = require('gulp');
var sass          = require('gulp-sass');// подключаем gulp-sass
var minifyCss     = require('gulp-clean-css');//минификация css
var rename        = require('gulp-rename');
var notify        = require("gulp-notify");
var minifyJs      = require("gulp-minify");
var autoprefixer  = require('gulp-autoprefixer');
var clean         = require('gulp-clean');
var combineMq     = require('gulp-combine-mq');
var spritesmith   = require('gulp.spritesmith');

//==============================================================================
//**************************  FrontEnd  ****************************************
//==============================================================================
//ПУТИ
var F_webDir = './frontend/web/';

var F_sourceDir = F_webDir + 'source/',
    F_sassDir = F_sourceDir + 'sass/',
    F_sassMainFile = F_sassDir + 'main.scss';

var F_jsDir = F_sourceDir + 'js/',
    F_jsFile = F_jsDir + 'main.js';

var F_destCssDir = F_webDir + 'styles/css/',
    F_destCssMinDir = F_webDir + 'styles/css-min/';

var F_destJsMinDir = F_webDir + 'js/';

var sassOptions = {
  outputStyle: 'nested',
  precison: 3,
  errLogToConsole: true,
};

//------------------------------------------------------------------------------
//                  компиляция sass
//------------------------------------------------------------------------------
gulp.task('front:compileSass', ['front:clean'], function(){
  return gulp
      .src([F_sassMainFile])
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        cascade: false
      }))
      .pipe(combineMq({
        beautify: false
      }))
      .pipe(gulp.dest(F_destCssDir))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifyCss({processImport: false}))
      .pipe(gulp.dest(F_destCssMinDir))
      .pipe(notify("front:compileSass was compiled!"));
});

//Компиляция js
gulp.task('front:compileJs', function() {
  return gulp
      .src(F_jsFile, { allowEmpty: true })
      .pipe(minifyJs({noSource: true}))
      .pipe(gulp.dest(F_destJsMinDir))
});

// Очистка перед новой записью
gulp.task('front:clean', function() {
  return gulp.src([F_destCssDir, F_destCssMinDir], {read: false})
      .pipe(clean())
      .pipe(notify("front:clean was compiled!"));
});

//------------------------------------------------------------------------------
//Создание спрайтов
//------------------------------------------------------------------------------
gulp.task('sprite', function () {
  var spriteData = gulp.src(F_webDir + 'img-styles/icons48X48/*.png').pipe(spritesmith({
    imgName: 'sprite-icons48X48.png',
    cssName: 'sprite-icons48X48.scss'
  }));
  return spriteData.pipe(gulp.dest(F_webDir + 'img-styles/sprite-icons48X48/'));
});

//------------------------------------------------------------------------------
//Наблюдение за файлами. (запуск из консоли - gulp watch)
//------------------------------------------------------------------------------

gulp.task('watch', function(){

  gulp.watch(F_sassDir + '**/*.scss', [
    'front:clean',
    'front:compileSass',
    'front:compileJs',
    'front:combineMq'
  ]);

});

//тестируем
gulp.task('hello', function() {
  console.log(F_sassDir + '**/*.scss');
});

//Полная компиляция. (запуск из консоли - gulp)
gulp.task('default', ['front:compileSass', 'front:compileJs'], function() {
  console.log('*** OK ***');
});