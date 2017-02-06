(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room, $cookies, $timeout, $uibModal) {
         this.logOut = function() {
             $cookies.put('blocChatCurrentUser', "");
             getUserName($uibModal, $cookies, $firebaseArray);
         }
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
         
         var updateUsername = function() {
             var username = $cookies.get("blocChatCurrentUser");
             if (username == null || username.length == 0) {
                 $timeout(updateUsername, 200);
             } else {
                 $scope.username = username;
             }
         }
         
         $timeout(updateUsername, 200);

     }
 
     angular
         .module('blocChat')
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', '$cookies', '$timeout', '$uibModal', RoomsCtrl]);
 })();