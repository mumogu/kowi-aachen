const gulp = require('gulp')
const child = require('child_process')
const gutil = require('gulp-util')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const browserSync = require('browser-sync')
const babel = require('gulp-babel')

gulp.task('build', ['jekyll', 'sass', 'img', 'babel'], () => {

})

gulp.task('serve', () => {
    browserSync.init({
        files: 'dist/**',
        port: 4000,
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('src/**/*', ['jekyll', 'sass', 'img', 'babel'])
})

gulp.task('jekyll', () => {
    child.execSync('cd src && jekyll build', (err, stdout, stderr) => {
        gutil.log(stdout)
        gutil.log(stderr)
    })
})

gulp.task('sass', () => {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('img', () => {
    return gulp.src('src/assets/img/*.*')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('babel', () => {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
})