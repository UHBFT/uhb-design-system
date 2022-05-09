const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-dart-sass');
sass.compiler = require('sass');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');


// Build, autoprefix and minify SCSS
function compileCSS () {
  return gulp.src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(rename({
      basename: 'uhb'
    }))
    .pipe(gulp.dest('./dist'))
}

exports.compileCSS = compileCSS;


// Minify and clean CSS
function minifyCSS () {
  return gulp.src([
    'dist/*.css',
    '!dist/*.min.css'
  ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist'))
}


// Compile JavaScript
function compileJS() {
  return gulp.src('./src/js/main.js')
  .pipe(webpack({
    mode: 'production',
    module: {
      rules: [
        {
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }, 
      ],
    },
    output: {
      filename: 'uhb.js',
    },
    optimization: {
      minimize: false
    },
    target: 'web',
  }))
  .pipe(gulp.dest('./dist'));
}


// Minify JavaScript
function minifyJS () {
  return gulp.src([
    'dist/*.js',
    '!dist/*.min.js'
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist'))
}


// Compile CSS and JavaScript
exports.compile = gulp.series(
  compileCSS,
  compileJS
);


// Minify CSS and JavaScript
exports.minify = gulp.series(
  minifyCSS,
  minifyJS
);


// Compile and build CSS and JavaScript
exports.build = gulp.series(
  gulp.parallel(
    compileCSS,
    compileJS
  ),
  gulp.parallel(
    minifyCSS,
    minifyJS
  )
);


// Default watch function
exports.default = function() {
  gulp.watch(['./src/scss/**/*.scss'], gulp.series(compileCSS, minifyCSS));
  gulp.watch(['./src/js/**/*.js'], gulp.series(compileJS, minifyJS));
}