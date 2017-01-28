angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

var ModalDemoCtrl =  function ($scope, $uibModal, $log, $document) {
  var $ctrl = this;

  $scope.open = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      appendTo: parentElem
    });

    modalInstance.result.then(undefined, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}

var ModalInstanceCtrl = function($scope, $uibModalInstance) {

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}


angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log', '$document', ModalDemoCtrl]);


angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', ModalInstanceCtrl]);