/**
 * Server related tasks.
 */

var fs    = require('fs')
  , gulp  = require('gulp')
  , async = require('async')
  , choko = require('../node_modules/choko/lib/application')
  , server;

/**
 * Initiate El-Tracker with a custom testing database.
 */
gulp.task('server:test', function (done) {

  // Create a server.
  module.exports.server = server = new choko('./app');

  // Modifiy application settings when starting.
  server.on('applicationSettings', function (settings) {
    settings.database = 'mongodb://localhost/ck_convenios_test_db';
  });

  // Start the server.
  server.start(3020, function (error, server) {
    var droppers = Object.keys(server.collections).map(function (collection) {
          return function (next) {
            server.collections[collection].drop(next);
          };
        });

    // @todo: handle erros on droppers.
    async.parallel(droppers, function (err) {
      done();
    });
  });
});
