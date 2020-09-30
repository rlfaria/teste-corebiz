var gulp        = require('gulp');
var cssmin      = require('gulp-cssmin');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');
const terser    = require('gulp-terser');

// Server  HTML/SCSS
gulp.task('serve', ['buildImg','buildBootstrapcss','buildBootstrapjs','buildJs','copyOthers','copy-fonts','copy-fonts2','copy-awesome'], function(){
    browserSync.init({
        server:"dist" 
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/assets/scss/*.scss'], ['buildBootstrapcss']);
    gulp.watch('src/assets/js/*.js',['buildBootstrapjs','buildJs']).on('change', browserSync.reload);
    gulp.watch('src/assets/css/*.css', ['buildCss']).on('change', browserSync.reload);
    gulp.watch("src/**/*.html",['copyOthers']).on('change', browserSync.reload);
    
});

gulp.task('default',['serve'])

gulp.task('clean', ()=> {
    del(['dist/']);
})


gulp.task('clean', function(cb) {
    del(['dist/'], cb);
  });

gulp.task('buildImg', ()=> {
    return gulp.src(['src/assets/images/**', 'src/assets/images/**/*.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images/'))
})

gulp.task('buildBootstrapcss', ['buildCss'], ()=> {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/assets/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/assets/css/"))
   
})

gulp.task('buildCss', ()=> {
    return gulp.src('src/assets/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/assets/css/'))
})

gulp.task('buildJs', ()=> {
    return gulp.src(['src/assets/js/*.js','!src/assets/js/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js/"))
})

gulp.task('copyOthers', ()=> {
    return gulp.src(['src/**','!src/assets/**'])
    .pipe(gulp.dest("dist/"))
})

gulp.task('copy-awesome', ()=> {
    return gulp.src('src/css/font-awesome.css')
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('copy-fonts', ()=> {
    return gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('src/assets/fonts/'));
});
gulp.task('copy-fonts2', ()=> {
    return gulp.src('src/assets/fonts/*.*')
    .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('buildBootstrapjs', ()=> {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(terser())
    .pipe(gulp.dest("dist/assets/js"))
})

gulp.task('build', ['buildImg','buildBootstrapcss','copy-awesome','copy-fonts','copy-fonts2','buildBootstrapjs','buildJs','copyOthers'] ) 