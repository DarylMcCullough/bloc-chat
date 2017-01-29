(function() {
	function ChatRoomsBtnCtrl($scope, $uibModal, $log, $document) {
        $scope.data = {roomName :"HowdyHoo"};
        
		$scope.open = function(size, parentSelector) {
			var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/templates/myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				appendTo: parentElem,
                scope: $scope
			});
			modalInstance.result.then(undefined, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	}
	angular.module('blocChat').controller('ChatRoomsBtnCtrl', ['$scope', '$uibModal', '$log', '$document', ChatRoomsBtnCtrl]);
})();