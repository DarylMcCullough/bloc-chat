(function() {
    var ModalInstanceCtrl = function($scope, $uibModalInstance) {

      $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    };
    
    angular
        .module('blocChat')
        .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', ModalInstanceCtrl]);
 })();