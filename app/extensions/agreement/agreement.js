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

      doc.pipe(fs.createWriteStream('out.pdf'));

      doc.text('Hola', 50, 70);

      response.writeHead(200, {"Content-Type": "application/pdf"});

      doc.pipe(response);
      doc.end();
    }
  };


  callback(null, newRoutes);
};
