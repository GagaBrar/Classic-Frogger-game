var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('autoprefixer', function () {
    gulp.src(['./src/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
})


gulp.task('minify', () => {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/css/*css'));
});