(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room, $cookies) {
         //this.rooms = Room.all;
         this.rooms = [];
         var myRooms = [];
         $scope.updateRooms = function() {
             for (var i=0; i<20; i++) {
                 var room = {};
                 room.$value = "room" + i;
                 room.$id = "id" + i;
                 myRooms.push(room);
             }
         }

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
        
        $scope.updateRooms();
        this.rooms = myRooms;
        Room.registerCallback(update, "RoomsCtrl");

     }
 
     angular
         .module('blocChat')
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', '$cookies', RoomsCtrl]);
 })();