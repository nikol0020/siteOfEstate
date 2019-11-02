const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
//const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
//const del = require('del');
const browserSync = require('browser-sync').create();
sass.compiler = require('node-sass');

const jsFiles = [
    './src/js/main.js'
];



gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// function styles(){
//
//     //Шаблон для поиска файлов css
//     //Все файлы по шаблону './src/css/**/*.css'
//     return gulp.src(cssFiles)
//         .pipe(concat('style.css'))
//
//         //Минификация CSS
//         .pipe(cleanCSS({
//             level: 2
//         }))
//         //Выходная папка для стилей
//         .pipe(gulp.dest('./build/css'))
//         .pipe(browserSync.stream())
// }


function scripts(){
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))
        //Выходная папка для js
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
}

/*function clean(){
    return del(['./build/!*'])
}*/
//Запускаем сервер и просматриваем файлы
// function watch() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
//     //Следить за CSS файлами
//     gulp.watch('./src/sass/**/*.scss', ['sass']);
//     //Следить за JS файлами
//     gulp.watch('./src/js/**/*.js', scripts);
//     //При изменении HTML запустить синхронизацию
//     gulp.watch('./*.html').on('change',browserSync.reload);
// }
//Таскc для вызова
//gulp.task('styles1', styles);
gulp.task('scripts1', scripts);
//Таск для очистки папки build
//gulp.task('del', clean);
// gulp.task('watch', watch);
// gulp.task('build', gulp.series(gulp.parallel(sass,scripts)));
//gulp.task('build', gulp.series(clean,gulp.parallel(sass,scripts)));
//Таск запускает build и watch последовательно
// gulp.task('dev', gulp.series('build','watch'));