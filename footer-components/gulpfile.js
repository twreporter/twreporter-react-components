const gulp = require('gulp')
const rimraf = require('rimraf')
const spawn = require('child_process').spawn
const path = require('path')

const clean = (target, cb) => {
  try {
    rimraf(target, { glob: false }, cb)
  } catch (error) {
    console.log(`Error when removing file ${target}: ${error}`)
    cb(error)
  }
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

// This function will copy the transpiled files to
// the customer folder. You can specify the customer folder path
// by running gulp command  like
// `CUSTOMER_FOLDER=/home/nick/codes/twreporter-react gulp run dev`,
// and those transpiled files will be copyed into
// `/home/nick/codes/twreporter-react/node_modules/twreporter-react-footer-components/lib`
let customerFolder = process.env.CUSTOMER_FOLDER
if (typeof customerFolder !== 'string') {
  customerFolder = path.resolve(__dirname, '../../twreporter-react')
}
const destFolder = `${customerFolder}/node_modules/twreporter-redux/lib`

gulp.task(
  'clean-customer-folder',
  cb => clean(destFolder, cb))

gulp.task(
  'copy-lib-to-customer-folder',
  () => {
    return gulp
      .src('./lib/**', { base: './lib' })
      .pipe(gulp.dest(destFolder))
  })

gulp.task(
  'clean-build',
  cb => clean(path.resolve(__dirname, './lib'), cb))

gulp.task(
  'copy-shared-files',
  () => {
    return gulp
      .src('../shared/**', { base: '../shared' })
      .pipe(gulp.dest('./tmp'))
  })

gulp.task(
  'babel-shared',
  cb => babel(path.resolve(__dirname, './tmp'), path.resolve(__dirname, './lib/shared'), cb))

gulp.task(
  'clean-tmp',
  cb => clean(path.resolve(__dirname, './tmp'), cb))

gulp.task(
  'babel-src',
  cb => babel(path.resolve(__dirname, './src'), path.resolve(__dirname, './lib'), cb))

gulp.task(
  'build-shared',
  gulp.series('clean-tmp', 'copy-shared-files', 'babel-shared', 'clean-tmp'))

gulp.task('build',
  gulp.parallel('build-shared', 'babel-src'))

gulp.task(
  'build-package',
  gulp.series('clean-build', 'build'))

gulp.task('dev', () => {
  const watcher = gulp.watch(['../shared/**', 'src/**', 'static/**'], gulp.series('clean-build', 'build', 'clean-customer-folder', 'copy-lib-to-customer-folder'))
  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} was changed, running tasks...`)
  })
})
