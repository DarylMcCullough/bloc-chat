(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room, $cookies, $timeout, Users, LogIn) {
         this.logOut = function() {
             var callback = function(okay, msg) {
                 if (okay) {
                    $scope.username = $cookies.get("blocChatCurrentUser");
                     $log.info("now, username = " + $scope.username);
                     LogIn.logIn();
                 }
             }
             Users.logOut($scope.username, callback);
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
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', '$log', 'Room', '$cookies', '$timeout', 'Users', 'LogIn', RoomsCtrl]);
 })();