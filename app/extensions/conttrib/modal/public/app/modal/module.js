/**
 * ------------------------------------------------------------------------
 * Modal Angular Module
 * ------------------------------------------------------------------------
 * This script is responsible for instantiating and configuring the
 * module itself.
 */

// Define the module.
angular.module('modal', ['panel-loader'])
  .config(['$injector',
    function ($injector) {
      try {
        // Add modal openning action if Actions
        // provider is available.
        $injector.get('ActionsProvider')
          .addAction('modal', function () {
            return function (param) {

              // Handle single string argument.
              if (typeof param == 'string') param = [param]

              // Fullfill arguments if needed.
              if (angular.isArray(param) && param.length < 3) {
                var panelName = param.shift();
                param.unshift('modal');
                param.unshift(panelName);
              }

              if (param && angular.isObject(param)) {
                param.region = 'modal';
              }

              return this['panel.load'](param);
            };
          })
      } catch(e) {}
    }
  ]);
