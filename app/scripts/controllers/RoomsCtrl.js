(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room) {
         this.rooms = Room.all;
         $scope.roomName = "No room selected";
         $scope.currentRoom = null;
         $scope.currentRoomId = null;
         
         var ctrl = this;
         
        $scope.setRoom = function(room) {
            for (var i=0; i<ctrl.rooms.length; i++) {
                ctrl.rooms[i].class = "unselected";
            }
            room.class = "selected";

            $scope.currentRoom = room;
            $scope.roomName = room.$value;
            $scope.currentRoomId = room.$id;
            $scope.messages = Room.getByRoomId($scope.currentRoomId);
            $scope.oneAtATime = false;
            $scope.openAll();
        }
        
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
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', RoomsCtrl]);
 })();