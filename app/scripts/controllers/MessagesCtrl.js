(function() {
     function MessagesCtrl($scope, $firebaseArray, $log, Room, Messages) {
         $scope.roomName = "No room selected";
         $scope.currentRoomId = null;
         $scope.messagesDescription = "0 messages";
         var ctrl = this;
         
         var update = function() {
            $scope.roomName = Room.currentRoomName;
            $scope.currentRoomId = Room.currentRoomId;
            $scope.messages = Messages.getByRoomId(Room.currentRoomId);
             $scope.numMessages = $scope.messages.length;
            if ($scope.messages.length == 0) {
                $scope.messagesDescription = "0 messages";
            } else if ($scope.messages.length == 1) {
                $scope.messagesDescription = "1 message";
            } else {
                $scope.messagesDescription = $scope.messages.length + " message";
            }
             
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