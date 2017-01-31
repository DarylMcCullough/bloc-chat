(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room, $cookies) {
         this.rooms = Room.all;
         $scope.username = $cookies.get("blocChatCurrentUser");
     
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
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', '$cookies', RoomsCtrl]);
 })();