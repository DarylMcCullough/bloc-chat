(function() {
    var UNModalInstanceCtrl = function($scope, $uibModalInstance) {

      $scope.ok = function () {
        $uibModalInstance.close($scope.username);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    };
    
    angular
        .module('blocChat')
        .controller('UNModalInstanceCtrl', ['$scope', '$uibModalInstance', ModalInstanceCtrl]);
 })();