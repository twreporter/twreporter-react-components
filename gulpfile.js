/* eslint no-console:0 */
const gulp = require('gulp')
const rimraf = require('rimraf')
const path = require('path')
const babel = require('gulp-babel')
const fs = require('fs')
const merge = require('merge-stream')

const babelOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, './.babelrc'), 'utf8'))
const clean = target => cb => rimraf(target, { glob: false }, cb)
const folderBlackList = ['node_modules', 'lib']

const getFolderNames = dir => fs
  .readdirSync(dir)
  .filter(fileName => fs.lstatSync(path.resolve(dir, fileName)).isDirectory())
  .filter(dirName => !dirName.startsWith('.'))
  .filter(dirName => folderBlackList.indexOf(dirName) === -1)

const outputPath = path.resolve(__dirname, './lib')

/* clean ./lib folder */
gulp.task(
  'clean-build',
  clean(outputPath))

/*
  babel .js files of every sub-folder to ./lib
*/
gulp.task(
  'build',
  () => {
    const folders = getFolderNames(__dirname)
    const tasks = folders.map(folder => gulp
      .src([
        path.resolve(__dirname, folder, './**/*.js'),
        path.resolve(__dirname, folder, './**/src/**/*.json'),
        '!(**/gulpfile.js)',
      ], { base: '.' })
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(outputPath)))
    const babelMain = gulp.src(path.resolve(__dirname, './main.js'), { base: '.' })
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(outputPath))
    return merge(babelMain, tasks)
  })

// The tasks below will copy the transpiled files to
// the customer folder. You can specify the customer folder path
// by running gulp command like
// `CUSTOMER_FOLDER=/home/nick/codes/twreporter-react gulp copy-lib-to-customer-folder`,
// and those transpiled files will be copyed into
// `/home/nick/codes/twreporter-react/node_modules/twreporter-react-components`
let customerFolder = process.env.CUSTOMER_FOLDER
if (typeof customerFolder !== 'string') {
  customerFolder = path.resolve(__dirname, '../twreporter-react')
}
const moduleFolder = `${customerFolder}/node_modules/@twreporter/react-components`

gulp.task(
  'clean-customer-folder',
  clean(moduleFolder))

gulp.task(
  'copy-lib-to-customer-folder',
  () => {
    return gulp
      .src('./lib/**', { base: '.' })
      .pipe(gulp.dest(moduleFolder))
  })

gulp.task(
  'copy-node-modules-to-customer-folder',
  () => {
    return gulp
      .src('./node_modules/**', { base: '.' })
      .pipe(gulp.dest(moduleFolder))
  })

gulp.task(
  'copy-package-json-to-customer-folder',
  () => {
    return gulp
      .src('./package.json', { base: '.' })
      .pipe(gulp.dest(moduleFolder))
  })

gulp.task(
  'copy-files-to-customer-folder',
  gulp.parallel([
    'copy-lib-to-customer-folder',
    'copy-package-json-to-customer-folder']))


/* watch all .js files and babel changed file to customer module folder */
gulp.task('watch', () => {
  const folders = getFolderNames(__dirname)
  const watchedGlobs = folders.map(folder => path.resolve(folder, './**/*.js')).concat(path.resolve(__dirname, './main.js'))
  const destLib = path.resolve(moduleFolder, './lib')
  const watcher = gulp.watch(watchedGlobs)
  watcher
    .on('change', (filePath) => {
      console.log(`File ${filePath} was changed, babel it to dest: ${destLib}`)
      return gulp.src(filePath, { base: '.' })
        .pipe(babel(babelOptions))
        .pipe(gulp.dest(destLib))
    })
})
