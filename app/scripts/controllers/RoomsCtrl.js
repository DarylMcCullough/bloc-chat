(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room) {
         this.rooms = Room.all;
         //$scope.roomName = "No room selected";
         //$scope.currentRoom = null;
         //$scope.currentRoomId = null;
         
         var ctrl = this;
         
         var update = function() {
    
            for (var i=0; i<ctrl.rooms.length; i++) {
                var room = ctrl.rooms[i];
                if (room.$id == Room.currentRoomId) {
                    //$scope.currentRoom = room;
                    //$scope.roomName = room.$value;
                    //$scope.currentRoomId = room.$id;
                    //$scope.messages = Room.getByRoomId(room.$id);
                    room.class = "selected";
                } else {
                    room.class = "unselected";
                }
            }


            //$scope.oneAtATime = false;
            //$scope.openAll();  
         }
         
        $scope.setRoom = function(room) {
            
            Room.setRoom(room);
        }
        
		//$scope.oneAtATime = true;

        Room.registerCallback(update);
        //$scope.messages = [];
        //$scope.openAll = function() {        
        //    for(var i=0; i < $scope.messages.length; i++) {
        //        var message = $scope.messages[i];
        //        message.open = true;
        //    }
        //}
        
        //$scope.closeAll = function() {
        //    for(var i=0; i < $scope.messages.length; i++) {
        //        var message = $scope.messages[i];
        //        message.open = false;
        //    }
        //}
        //$scope.toggle = function(message) {
        //    if (message.open) {
        //        if ($scope.oneAtATime) {
        //            $scope.closeAll();
        //        }
        //        //$log.info("now it should be true");
        //        message.open = true;
        //    }
        //}
     }
 
     angular
         .module('blocChat')
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', RoomsCtrl]);
 })();