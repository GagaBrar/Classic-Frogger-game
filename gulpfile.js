var gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');


gulp.task('autoprefixer', function () {
    gulp.src(['./src/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
})
