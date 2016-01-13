/**
 * ------------------------------------------------------------------------
 * Action Module
 * ------------------------------------------------------------------------
 * This script is responsible for instantiating and configuring the
 * module itself.
 */

// Define the module.
angular.module('action', ['choko'])
  .run(['$rootScope', 'Actions',
    function ($rootScope, Actions) {
      $rootScope.Actions = Actions;
    }
  ]);
