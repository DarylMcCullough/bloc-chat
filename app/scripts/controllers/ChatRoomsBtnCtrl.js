(function() {
	function ChatRoomsBtnCtrl($scope, $uibModal, $log, $document) {
		$scope.singleModel = 1;
		$scope.greeting = "Howdy";
        $scope.foo = function() {
            alert("foo");
            $log.info("foo");
            
        }
		$scope.open = function(size, parentSelector) {
			var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/templates/myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				appendTo: parentElem
			});
			modalInstance.result.then(undefined, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
	angular.module('blocChat').controller('ChatRoomsBtnCtrl', ['$scope', '$uibModal', '$log', '$document', ChatRoomsBtnCtrl]);
})();