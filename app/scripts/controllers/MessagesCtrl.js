(function() {
     function MessagesCtrl($scope, $firebaseArray, $log, Room, Messages) {
         $scope.roomName = "No room selected";
         $scope.currentRoom = null;
         $scope.currentRoomId = null;
         
         var ctrl = this;
         
         var update = function() {
             $log.info("in MessagesCtrl update");
            $scope.roomName = Room.currentRoomName;
            $scope.currentRoomId = Room.currentRoomId;
            $scope.messages = Messages.getByRoomId(Room.currentRoomId);
             $log.info("number of messages: " + $scope.messages.length);
            $scope.oneAtATime = false;
            $scope.openAll();
         }
         
         Room.registerCallback(update, "MessagesCtrl");
        
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
                message.open = true;
            }
        }
     }
 
     angular
         .module('blocChat')
         .controller('MessagesCtrl', ['$scope', '$firebaseArray', '$log', 'Room', 'Messages', MessagesCtrl]);
 })();