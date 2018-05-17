var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('css', function () {
            gulp.src(['./src/css/*.css'])
                .pipe(autoprefixer({
                    browsers: ['last 10 versions'],
                    cascade: false
                })).pipe(cleanCSS({
                    compatibility: 'ie8'
                }))

                .pipe(gulp.dest('./dist/css/'))

            });