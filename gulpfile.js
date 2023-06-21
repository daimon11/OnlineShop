import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import cssImport from 'gulp-cssimport';
import { deleteAsync } from 'del';
import htmlMin from 'gulp-htmlmin';
import cleanCss from 'gulp-clean-css';
import terser from 'gulp-terser';
import sourceMaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
import { stream as critical } from 'critical';
import gulpif from 'gulp-if';
// задачи

const prepros = true;

let dev = false;

const sass = gulpSass(sassPkg);

export const html = () => gulp
  .src('src/*.html')
  .pipe(htmlMin({
    removeComments: true,
    collapseWhitespace: true,
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(gulpif(dev, sourceMaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCss({
        2: {
          specialComments: 0,
        }
      }))
      .pipe(gulpif(dev, sourceMaps.write('../maps')))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }
  return gulp
    .src('src/style/index.css')
    .pipe(gulpif(dev, sourceMaps.init()))
    .pipe(cssImport({
      extensions: ['css'],
    }))
    .pipe(cleanCss({
      2: {
        specialComments: 0,
      }
    }))
    .pipe(gulpif(dev, sourceMaps.write('../maps')))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
  .src('src/script/**/*.js')
  .pipe(gulpif(dev, sourceMaps.init()))
  .pipe(terser())
  .pipe(gulpif(dev, sourceMaps.write('../maps')))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/img/**/*.{jpeg,jpg,png,svg,gif,jfif}')
  .pipe(gulpif(!dev, gulpImg({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: true,
  })))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const webp = () => gulp
  .src('src/img/**/*.{jpeg,jpg,png,jfif}')
  .pipe(gulpWebp({
    quality: 60
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const avif = () => gulp
  .src('src/img/**/*.{jpeg,jpg,png,jfif}')
  .pipe(gulpAvif({
    quality: 60
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const critCSS = () => gulp
  .src('dist/*.html')
  .pipe(
    critical({
      base: 'dist/',
      inline: true,
      css: ['dist/css/index.css'],
    })
    // console.log('все должно работать');
  )
  .on('error', err => {
    console.error(err.message)
  })
  .pipe(gulp.dest('dist'))

export const copy = () => gulp
  .src('src/fonts/**/*', {
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
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('src/img/**/*.{jpeg,jpg,png,svg,gif,jfif}', img);
  gulp.watch('./src/**/*.html', js);
  gulp.watch('./src/fonts/**/*', copy);
  gulp.watch('src/img/**/*.{jpeg,jpg,png,jfif}', avif);
  gulp.watch('src/img/**/*.{jpeg,jpg,png,jfif}', webp);
}

export const clear = () => deleteAsync('dist/**/*', { forse: true, });

// запуск
export const develop = async () => {
  dev = true;
}

export const base = gulp.parallel(html, style, js, img, avif, webp, copy);

export const build = gulp.series(clear, critCSS, base);

export default gulp.series(develop, base, server);