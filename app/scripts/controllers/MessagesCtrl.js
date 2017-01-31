(function() {
     function MessagesCtrl($scope, $firebaseArray, $log, Room) {
         $scope.roomName = "No room selected";
         $scope.currentRoom = null;
         $scope.currentRoomId = null;
         
         var ctrl = this;
         
         var update = function() {
            $scope.roomName = Room.currentRoomName;
            $scope.currentRoomId = Room.currentRoomId;
            $scope.messages = Room.getByRoomId(Room.currentRoomId);
            $scope.oneAtATime = false;
            $scope.openAll();  
         }
         
         Room.registerCallback(update);
        
		$scope.oneAtATime = true;

        $scope.messages = [];
        $scope.openAll = function() {        
            for(var i=0; i < $scope.messages.length; i++) {
                var message = $scope.messages[i];
                message.open = true;
            }
        }
        
        $scope.closeAll = function() {
            for(var i=0; i < $scope.messages.length; i++) {
                var message = $scope.messages[i];
                message.open = false;
            }
        }
        $scope.toggle = function(message) {
            if (message.open) {
                if ($scope.oneAtATime) {
                    $scope.closeAll();
                }
                //$log.info("now it should be true");
                message.open = true;
            }
        }
     }
 
     angular
         .module('blocChat')
         .controller('MessagesCtrl', ['$scope', '$firebaseArray', '$log', 'Room', MessagesCtrl]);
 })();