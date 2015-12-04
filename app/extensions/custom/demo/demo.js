'use strict';

/**
 * Demo extension
 */

var demo = module.exports;

/**
 * The page() hook.
 */
demo.page = function(pages, callback) {
  
  var newPages = {};
  
  pages['demo'].content = "Saludos";
  
  newPages['nuevo'] = {
    path: '/nuevo',
    title: 'Nuevo',
    content: '<h1>Hola!!</h1>',
    access: function(request, response, callback) {      
      
      if (!request.user) return callback(null, false);
      
      callback(null, true);
    }
  };
  
  callback(null, newPages);
};