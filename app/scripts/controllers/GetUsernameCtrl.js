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
				$log.info('Modal dismissed at: ' + new Date());
                $log.info('New room name: ' + x);
                if (x != null && x.length > 0) {
                    $log.info("Before:");
                    
                    var rooms = Room.all;
                    for (var i=0; i<rooms.length; i++) {
                        $log.info(rooms[i].$value);
                    }
                    

                    rooms.$add({ $value: x }).then(function(ref) {
                        var id = ref.key;
                        console.log("added record with id " + id);
                        rooms.$indexFor(id); // returns location in the array
                    });
                    
                    $log.info("After:");
                    for (var i=0; i<rooms.length; i++) {
                        $log.info(rooms[i].$value);
                    }
                }
			});
		};
	}
	angular.module('blocChat').controller('ChatRoomsBtnCtrl', ['$scope', '$uibModal', '$log', '$document', 'Room', ChatRoomsBtnCtrl]);
})();