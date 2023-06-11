import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import cssImport from 'gulp-cssimport';
import { deleteAsync } from 'del';
// задачи

const prepros = true;

const sass = gulpSass(sassPkg);

export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

// export const css = () => 


export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }
  return gulp
    .src('src/style/index.css')
    .pipe(cssImport({
      extensions: ['css'],
    }))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
  .src('src/script/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/img/*',
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true
  }))

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./src/**/*.html', html);
  // gulp.watch('./src/**/*.html', css);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/**/*.html', js);
  gulp.watch(['./src/style/**/img/*', './src/fonts/**/*'], copy);
}

export const clear = () => deleteAsync('dist/**/*', { forse: true, });

// запуск
export const base = gulp.parallel(html, style, js, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);