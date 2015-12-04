/**
 * ------------------------------------------------------------------------
 * Action Service
 * ------------------------------------------------------------------------
 */

angular.module('action')
  .provider('Actions', function () {

    // Action functions work most like Angular filters: they are injectable
    // functions that return the actual function for an action. This returned
    // function will be provided with the param for the action.
    var actions = {};

    /**
     * Register a new action.
     */
    this.addAction = function (name, action) {
      actions[name] = action
    };

    // Register the default url action.
    this.addAction('url', ['$location',
      function ($location) {
        return function (param) {
          return $location.path(param);
        }
      }
    ]);

    // Factory.
    this.$get = function ($injector, $q, $timeout) {

      var injectedActions = {};

      // Construct actions.
      Object.keys(actions).forEach(function (actionName) {
        injectedActions[actionName] = $injector.invoke(actions[actionName]);
      });

      return {

        /**
         * Perform an action.
         * @todo: this could make use of promises to provide asyncronous actions.
         */
        do: function () {

          // Prepared deferring object.
          var deferred = $q.defer();

          // Parse arguments to array.
          var args = [].map.call(arguments, function (arg) {
            return arg;
          });

          // Get param data.
          var actionMap = args.shift();

          // Actions can be written using pipe strings.
          if (typeof actionMap == 'string') {

            var pipes = actionMap.split('|');

            // If using pipes, first item is argument for the first action.
            var firstParam = pipes.shift();

            // If there is no pipe action, fill with default url action.
            if (!pipes.length) {
              pipes.push('url');
            }

            // Reset actionMap.
            actionMap = {};

            // Transform pipes into action mapping object.
            pipes.forEach(function (pipe, i) {
              actionMap[pipe] = i == 0 ? firstParam : ':chain';
            });
          }

          // Get working promise.
          var promise = null;

          // Chain actions on promises.
          Object.keys(actionMap).forEach(function (name, i) {

            // Handle undefined action error.
            if (!injectedActions[name]) {
              throw new Error('Undefined action "' + name + '".')
            }

            // Get action params.
            var params = actionMap[name];

            // For the first action, just get the promise with the param.
            if (i == 0) {
              promise = $timeout(function () {
                return injectedActions[name].apply(
                  injectedActions, [params].concat(args)
                );
              });
            }
            // For chained action, let results fall from upper promises.
            else if (params == ':chain') {
              promise = promise.then(injectedActions[name]);
            }
            else {
              promise = promise.then(function () {
                return injectedActions[name].apply(
                  injectedActions, [params].concat(args)
                );
              });
            }
          });

          return promise;
        }
      };
    };
  });
