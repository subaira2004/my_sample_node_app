var gulp = require('gulp');
gulp.task('move-bootstrap-to-production', function () {
    return gulp
        .src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./public/bootstrap/'))
});