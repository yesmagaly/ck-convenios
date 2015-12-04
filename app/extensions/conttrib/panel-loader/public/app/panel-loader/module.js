/**
 * ------------------------------------------------------------------------
 * Panel Loader Angular Module
 * ------------------------------------------------------------------------
 * This script is responsible for instantiating and configuring the
 * module itself.
 */

// Define the module.
angular.module('panel-loader', [])

  // Configure providers.
  .config(['$injector',
    function ($injector) {
      try {
        // Add panel loading/removing actions if Actions
        // provider is available.
        ['load', 'remove'].forEach(function (action) {
          $injector.get('ActionsProvider')
            .addAction('panel.' + action, function (Panel) {
              return function (param) {
                if (angular.isArray(param)) {
                  return Panel[action].apply(Panel, param);
                } else {
                  return Panel[action](param);
                }
              };
            })
        });
      } catch(e) {}
    }
  ])

  // Module runner.
  .run(['$rootScope', 'Panel',
    function ($rootScope, Panel) {
      // Make Panel methods available on rootScope.
      $rootScope.Panel = Panel;
    }
  ]);
