var async = require('async');
var spawn = require('child_process').spawn;
var git = require('gulp-git');
var gulp = require('gulp');

/**
 * Build Tasks
 */
gulp.task('build-packages', function (done) {
  async.auto({
    /* Clear output folders */
    clearOutputFolders: function(callback) {
      console.log('------ clearOutputFolders ------')
      spawn('rimraf', [ __dirname + '/lib-css', __dirname + '/dist' ], { stdio: 'inherit' })
        .on('close', callback)
        .on('error', function(err) {
          callback(err)
        })
    },
    /* Build components with babel: src -> dist (JS) and lib-css (CSS) */
    /* Babel with webpack will compile: (1) ES6 to ES5 (2) scss to css module (3) svg file to inline svg */
    /* Related configs are in .babelrc and webpack/components.config.js */
    buildComponents: ['clearOutputFolders', function(results, callback) {
      console.log('------ buildComponents ------')
      process.env.WEBPACK_CONFIG = __dirname + '/webpack/components.config.js';
      process.env.BABEL_DISABLE_CACHE = 1;
      process.env.BABEL_ENV = 'BUILDPKG';
      process.env.NODE_ENV = 'production';
      spawn(
        'babel',
        [
          '--out-dir=dist',
          'src'
        ],
        {
          stdio: 'inherit'
        })
        .on('close', callback)
        .on('error', function(err) {
          callback(err);
        })
    }],
    /* Build bootstrap with webpack: bootstrap-sass -> lib-css/bootstrap.js and lib-css/bootstrap.css */
    /* Related config is in webpack/bootsreap.config.js and .bootstraprc */
    buildBootstrap: [ 'buildComponents', function(results, callback) {
      console.log('------ buildBootstrap ------')
      spawn(
        'webpack',
        [
          '--verbose', // show more details in console
          '--colors',
          '--display-error-details',
          '--config=' + __dirname + '/webpack/bootstrap.config.js'
        ],
        {
          stdio: 'inherit'
        })
        .on('close', callback)
        .on('error', function(err) {
          callback(err);
        })
    }],
    /* Combine css of components and bootstrap: lib-css -> dist/styles/main.css */
    /* Related config is in concatCssFiles.js */
    buildCss: ['buildBootstrap', function(results, callback) {
      console.log('------ buildCss ------')
      async.auto({
        createFolder: function(cb) {
          spawn('mkdir', ['-p', 'dist/styles'], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err);
            })
        },
        concatCss: [ 'createFolder', function(results, cb) {
          spawn('node', ['./concatCssFiles', __dirname], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err)
            })
        }],
        removeFolder: [ 'concatCss', function(results, cb) {
          spawn('rimraf', [ __dirname + '/lib-css' ], {stdio: 'inherit'})
            .on('close', cb)
            .on('error', function(err) {
              cb(err)
            })
        }]
      }, function(err, results) {
        if (err) {
          return callback(err)
        }
        callback()
      })
    }]
  }, function(err, results) {
    if (err) {
      console.log('build-packages process occurs err:', err)
    } else {
      console.log('build-packages process is done')
      done();
    }
  });
});

/**
 * Release Tasks
 */
gulp.task('publish:tag', function (done) {
  var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
  var v = 'v' +     pkg.version;
  var message = 'Release ' + v;

  git.tag(v, message, function (err) {
    if (err) throw err;
    git.push('origin', v, function (err) {
      if (err) throw err;
      done();
    });
  });
});


gulp.task('publish:npm', function (done) {
  require('child_process')
    .spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('release', ['publish:tag', 'publish:npm']);
