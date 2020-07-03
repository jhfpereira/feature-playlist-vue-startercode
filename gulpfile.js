const gulp = require('gulp')
const connect = require('gulp-connect')

const port = process.env.PORT || '8080';

gulp.task('reload', () => gulp.src('./src/*.html')
	.pipe(connect.reload()));

gulp.task('serve', () => {

    connect.server({
        root: './src',
        port: port,
        host: '0.0.0.0',
        livereload: true
    });

    return gulp.watch(['src/**/*.js'], gulp.series('reload'));
});
