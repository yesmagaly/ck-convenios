'use strict';

/**
 * Demo extension
 */

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
