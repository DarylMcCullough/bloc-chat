(function() {
	function ChatRoomsBtnCtrl($scope, $uibModal, $log, $document, Room) {
        $scope.data = {roomName :""};
        
        
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
			modalInstance.result.then(function(x) {
                if (x != null && x.length > 0) {
                    Room.addRoom(x);
                }
			});
		};
	}
	angular.module('blocChat').controller('ChatRoomsBtnCtrl', ['$scope', '$uibModal', '$log', '$document', 'Room', ChatRoomsBtnCtrl]);
})();