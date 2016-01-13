/*
 * The Panel Loader extension file.
 */

var panelLoader = module.exports;

/**
 * The route() hook.
 */
panelLoader.route = function(routes, callback) {
  var self = this;
  callback(null, {
    '/load-panel/:panel/:region/:itemKey?': {
      title: 'Panel Loader',
      access: true,
      callback: function(request, response, callback) {

        // Get params.
        var region = request.params.region;
        var panelName = request.params.panel;
        var itemKey = request.params.itemKey;

        // Get types.
        var panelModel = self.application.type('panel');

        panelModel.load(panelName, function(err, panel) {

          // Make a copy of the panel, so any changes to it won't persist.
          panel = JSON.parse(JSON.stringify(panel));

          if (err) return callback(err);
          if (!panel) return callback(null, 'Panel "' + panelName + '" not found.', 404);

          // Fullfill itemKey when required.
          if (panel.type == 'item' || panel.type == 'form' && panel.itemKey == ':panel-loader') {

            // If no itemKey is provided, throw an error.
            if (!itemKey) return callback('Could not resolve panel itemKey property.');

            panel.itemKey = itemKey;
          }

          // Contruct response data.
          var data = {
            panelLoader: true,
            panels: {}
          };
          data.panels[region] = [panel];

          callback(null, data);
        });
      }
    }
  });
};
