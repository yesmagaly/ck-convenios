/**
 * ------------------------------------------------------------------------
 * Panel Service
 * ------------------------------------------------------------------------
 */

angular.module('panel-loader')
  .factory('Panel', ['$rootScope', '$http', '$q',
    function ($rootScope, $http, $q) {

      // Start the factory.
      var Panel = {};

      /**
       * Recursively verifies if a row/column is empty.
       */
      function setEmptiness(region, childType) {

        region = typeof region == 'undefined' ? $rootScope.layout : region;
        childType = typeof childType == 'undefined' ? 'rows' : childType;

        // Consider empty by default, unless when region is told to always be
        // rendered.
        region.empty = region.alwaysRender ? false : true;

        // Check if region has content.
        if (region.empty && region.region == true) {
          region.empty = !Boolean($rootScope.panels[region.name] && $rootScope.panels[region.name].length);
        }

        // Iterate recursively
        if (region[childType] && region[childType].length) {
          region[childType].forEach(function (childRegion) {
            var childEmpty = setEmptiness(childRegion, childType == 'rows' ? 'columns' : 'rows');
            region.empty = !region.empty ? region.empty : childEmpty;
          });
        }

        return region.empty;
      }

      /**
       * Arbitrarily load a panel to a region.
       */
      Panel.load = function () {

        // Prepare return.
        var deferred = $q.defer();

        // Map arguments to array.
        var args = [].map.call(arguments, function (arg) {
          return arg;
        });

        // Map variables.
        var panelName   = args.shift();
        var regionName  = args.shift();
        var id          = args.shift();
        var load        = args.shift();
        var extendData  = args.shift();

        var argObject   = panelName;

        // Handle call with object argument.
        if (typeof argObject == 'object') {

          panelName  = argObject.panel;
          regionName = argObject.region || regionName;
          id         = argObject.id || id;
          load       = argObject.load || load;
          extendData = argObject.data || extendData;
        }

        /**
         * Method to work with the loaded panel.
         * This method can be overriden by the user, to do custom routines.
         */
        load = load || function (response, status) {

          delete $rootScope.extendData;

          // Save new panels to layout.
          angular.element().extend(true, $rootScope, response);

          setEmptiness();
        };

        // Reconstruct arguments.
        if (id) args.unshift(id);
        if (regionName) args.unshift(regionName);
        args.unshift(panelName);

        // Construct request path.
        var path = '/load-panel/' + [].join.call(args, '/');

        $http.get(path)
          .success(function (response, status) {

            // Validate return.
            var loadedPanel = response && response.panels && response.panelLoader;

            // Extend reponse with data;
            if (extendData) response.extendData = extendData;

            // Execute handler.
            if (loadedPanel) load(response, status);

            deferred[loadedPanel ? 'resolve' : 'reject'](response);
          });

        // Allow for later work.
        return deferred.promise;
      };

      /**
       * Removed a pane from a given region or from any region.
       */
      Panel.remove = function (panelName, regionName) {

        var panels = $rootScope.panels;
        var regionNames = Object.keys($rootScope.panels || {});

        // Filter region to exact match, if required.
        if (regionName) regionNames = regionNames.filter(function (name) {
          return name == regionName;
        });

        // Remove panes, if present.
        regionNames.forEach(function (name) {
          ($rootScope.panels[name] || []).filter(function (pane, i) {
            if (pane.name == panelName) $rootScope.panels[name].splice(i, 1);
          });
        });

        setEmptiness();
      };

      // Serve the service.
      return Panel;
    }
  ])
