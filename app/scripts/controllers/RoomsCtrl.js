(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room) {
         this.rooms = Room.all;
         
         var ctrl = this;
         
         var update = function() {
    
            for (var i=0; i<ctrl.rooms.length; i++) {
                var room = ctrl.rooms[i];
                if (room.$id == Room.currentRoomId) {
                    room.class = "selected";
                } else {
                    room.class = "unselected";
                }
            }

         }
         
        $scope.setRoom = function(room) {
            
            Room.setRoom(room);
        }
        

        Room.registerCallback(update, "RoomsCtrl");

     }
 
     angular
         .module('blocChat')
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', RoomsCtrl]);
 })();