const gulp = require('gulp')
const rimraf = require('rimraf')
const spawn = require('child_process').spawn
const path = require('path')

const clean = (target) => {
  return rimraf(target, { glob: false }, (error) => {
    if (error) {
      console.log(`Error when removing file ${target}: ${error}`)
    }
  })
}

const babel = (sourcePath, outputPath, cb) => {
  process.env.BABEL_DISABLE_CACHE = 1
  console.log(`Use Babel to transform files from ${sourcePath} to ${outputPath}`)
  return spawn(
    'babel',
    [sourcePath, `--out-dir=${outputPath}`])
      .on('close', cb)
      .on('error', err => cb(err), {
        stdio: 'inherit',
      })
}

gulp.task('clean-build', () => clean(path.resolve(__dirname, './lib')))

gulp.task('copy-shared-files', ['clean-build'], () => {
  return gulp
    .src('../shared/**', { base: '../shared' })
    .pipe(gulp.dest('./tmp'))
})

gulp.task(
  'babel-shared',
  ['copy-shared-files'],
  cb => babel(path.resolve(__dirname, './tmp'), path.resolve(__dirname, './lib/shared'), cb))

gulp.task('clean-tmp', ['babel-shared'], () => clean(path.resolve(__dirname, './tmp')))

gulp.task('build-shared', ['clean-tmp'])

gulp.task(
  'babel-src',
  ['clean-build'],
  cb => babel(path.resolve(__dirname, './src'), path.resolve(__dirname, './lib'), cb))

gulp.task('build-package', ['build-shared', 'babel-src'])

gulp.task('dev', () => {
  const watcher = gulp.watch(['../shared/**', 'src/**', 'static/**'], ['build-package'])
  watcher.on('change', (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`)
  })
})
