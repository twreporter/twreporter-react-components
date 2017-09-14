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
  'clean-twreporter-node-modules', (cb) => {
    let customerFolder = process.env.CUSTOMER_FOLDER
    if (typeof customerFolder !== 'string') {
      customerFolder = path.resolve(`${__dirname}/../../twreporter-react`)
    }
    return clean(`${customerFolder}/node_modules/twreporter-react-bookmarks-components/lib`, cb)
  })

gulp.task(
  'copy-lib-to-twreporter',
  () => {
    return gulp
      .src('./lib/**', { base: './lib' })
      .pipe(gulp.dest('../../twreporter-react/node_modules/twreporter-react-bookmarks-components'))
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

// This function will copy the transpiled files to
// the customer folder. You can specify the customer folder path
// by running gulp command  like
// `CUSTOMER_FOLDER=/home/nick/codes/twreporter-react gulp run dev`,
// and those transpiled files will be copyed into
// `/home/nick/codes/twreporter-react/node_modules/twreporter-react-bookmarks-components/lib`
gulp.task('teleport', gulp.series('clean-twreporter-node-modules', () => {
  let customerFolder = process.env.CUSTOMER_FOLDER
  if (typeof customerFolder !== 'string') {
    customerFolder = path.resolve(`${__dirname}/../../twreporter-react`)
  }
  return gulp
    .src('./lib/**/*')
    .pipe(gulp.dest(`${customerFolder}/node_modules/twreporter-react-components/lib/twreporter-react-bookmarks-components/lib`))
}))

// promise chain
gulp.task('dev', gulp.series('build', 'teleport', () => {
  const watcher = gulp.watch(['../shared/**', 'src/**', 'static/**'], gulp.series('clean-build', 'build', 'teleport'))
  watcher.on('change', (filePath) => {
    console.log(`File ${filePath} was changed, running tasks...`)
  })
}))
