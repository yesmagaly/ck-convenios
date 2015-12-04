/**
 * ------------------------------------------------------------------------
 * Modal Angular Module
 * ------------------------------------------------------------------------
 * This script is responsible for instantiating and configuring the
 * module itself.
 */

// Define the module.
angular.module('dialog', ['modal', 'action'])
  .config(['$injector', 'ActionsProvider',
    function ($injector, ActionsProvider) {
      $injector.get('ActionsProvider')

        /**
         * Confirmation dialog action.
         */
        .addAction('dialog.confirm', function ($timeout) {
          return function (params) {
            return $timeout(function () {

              // Parse params
              if (typeof params == 'string') params = { message: params };

              var confirmation = confirm(params.message);

              // Reject on confirmation rejection.
              if (!confirmation) throw({
                action: 'dialog.confirm',
                result: {
                  rejected: params
                }
              });

              return params;
            });
          };
        })
    }
  ]);
