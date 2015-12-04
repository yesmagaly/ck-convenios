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


/**
 * The route() hook.
 */
search.route = function(routes, callback) {
  var newRoutes = {};
  var application = this.application;

  newRoutes['/rest/organizations/query'] = {
    access: true,
    callback: function(request, response, callback) {
      var AgreementModel = application.type('agreement');
      var params = request.body || {};
      var query = {};
      console.log(params);

      // TODO: list would be filter items.
      // AgreementModel.list(query, function (error, agreements) {
      //   callback(null, agreements, 200);
      // });

      if (params.title) {
        query['title'] = {
          like: '%' + params.title + '%'
        };
      }

      console.log(query);

      AgreementModel.find()
        .where(query)
        .exec(function (error, agreements) {

          if (error) {
            return callback(error);
          }

          callback(null, agreements, 200);
        });
    }
  };

  callback(null, newRoutes);
};
