angular.module('agreement')
  .controller('ItemAgreementController', [
    '$scope',
    '$controller',
    function ($scope, $controller) {

    // Inherit ItemController.
    $controller('ItemController', {
      $scope: $scope
    });

    $scope.expirado = 'HOla';

    suscriptionDate = '01/01/2011';
    expiredDate = '4 años';

    $scope.isExpired = true;

  }]);
