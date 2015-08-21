'use strict';

/**
 * Demo extension
 */

var search = module.exports;

/**
 * The page() hook.
 */
search.page = function(pages, callback) {

  pages["home"].content = "";

  callback();
};
