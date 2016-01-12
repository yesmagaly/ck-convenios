/**
 * ----------------------------------------------------------------------------
 * Search Controllers
 * ----------------------------------------------------------------------------
 */

 angular.module('search')
  /**
   * Search form controller.
   */
  .controller('SearchFormCtrl', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      $scope.$watch('viewForm', function() {

        if ($scope.viewForm) {
          $scope.viewForm.then(function(response) {
            $rootScope.$broadcast('searchAgreementstUpdated', response);
          });
        }

      });

    }
  ])

  .controller('SearchListCtrl', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
      $scope.$on('searchAgreementstUpdated', function (event, result) {
        console.log(result);

        $rootScope.$broadcast('agreementList', function($scope) {
          $scope.items = result;
        })
      });
    }
  ])
