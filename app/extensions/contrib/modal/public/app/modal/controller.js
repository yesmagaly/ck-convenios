/**
 * ------------------------------------------------------------------------
 * Modal Controller
 * ------------------------------------------------------------------------
 */

angular.module('modal')
  .controller('ModalController', [
    '$scope', '$controller', 'Panel', 'Actions',
    function ($scope, $controller, Panel, Actions) {

      // @todo: we probably shouldn't do it this way.
      var $body = angular.element('body');

      $body.addClass('modal-open');

      // Default templates.
      $scope.headerTemplate = $scope.panel.headerTemplate || '/templates/modal-header.html';
      $scope.footerTemplate = $scope.panel.footerTemplate;

      $scope.modalTitle = $scope.panel.title;

      // footer classes.
      if (!$scope.panel['footer-classes']) {
        $scope.panel['footer-classes'] = 'modal-footer';
      }

      /**
       * Closes the modal.
       */
      $scope.dismiss = function (name, region) {
        Panel.remove(name, region);
      }

      // Extend scope object.
      if ($scope.extendData) {
        Object.keys($scope.extendData).forEach(function (name) {

          // Overwrite scope object.
          if ($scope[name] && $scope.panel.overwriteData) $scope[name] = $scope.extendData[name];

          // Extend scope with extendData objects.
          if (!$scope[name]) $scope[name] = $scope.extendData[name];
        });
      }

      // Inherit controller.
      $controller('PanelController', {
        $scope: $scope
      });

      // Verify if AfterClose parameter is defined.
      if ($scope.panel.afterClose) {
        var dismissModal = $scope.dismiss;

        // Override dismiss method.
        $scope.dismiss = function(panelName, rowName) {
          dismissModal(panelName, rowName);
          Actions.do($scope.panel.afterClose.action || $scope.panel.afterClose.url)
        };
      }

      if ($scope.panel.modalController) {
        $controller($scope.panel.modalController, {
          $scope: $scope
        });
      }

      $scope.$on("$destroy", function() {
        $body.removeClass('modal-open');
      });
    }
  ]);
