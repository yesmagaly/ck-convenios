'use strict';

/**
 * Demo extension
 */
var PDFDocument = require('pdfkit');

var fs = require('fs');

var agreement = module.exports;

/**
 * The page() hook.
 */
agreement.find = function(type, query, callback) {

  if (type === 'agreement') {
    query.populate('institution');
    query.populate('entities');
    query.populate('purpose');
    query.populate('responsibles');
  }
  callback();
};


/**
 * The route() hook.
 */
agreement.route = function(routes, callback) {
  var newRoutes = {};

  newRoutes['/pdf-report'] = {
    access: true,
    callback: function(request, response, callback) {
      var doc = new PDFDocument();

      doc.text('Hola', 50, 70);

      response.writeHead(200, {
        'Content-Type': 'application/pdf',
        // 'Access-Control-Allow-Origin': '*',
        // @NOTE: this configuration if whant dowload file by default.
        // 'Content-Disposition': 'attachment; inline; filename=out.pdf'
      });

      // @TODO: move this file to correct directory.
      doc.pipe(fs.createWriteStream('out.pdf'));

      doc.pipe(response);
      doc.end();
    },
    router: 'static'
  };

  callback(null, newRoutes);
};
