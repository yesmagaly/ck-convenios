'use strict';

/**
 * Demo extension
 */

var main = module.exports;


/**
 * the navigation() hook.
 */

main.navigation = function(navigations, callback) {

  navigations['main'].items.push({
    "title": "Inicio",
    "url": "/home"
  });

  navigations['main'].items.push({
    "title": "Convenios",
    "url": "/agreements"
  });

  navigations['main'].items.push({
    "title": "Opciones",
    "url": "/entities"
  });

  callback();
};
