(function() {
    var ModalInstanceCtrl = function($scope, $uibModalInstance) {

      $scope.ok = function () {
        $uibModalInstance.close($scope.data.roomName);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    };
    
    angular
        .module('blocChat')
        .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', ModalInstanceCtrl]);
 })();