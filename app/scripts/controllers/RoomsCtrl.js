(function() {
     function RoomsCtrl($scope, $firebaseArray, $log, Room, $cookies, $timeout, $uibModal) {
         this.logOut = function() {
             firebase.auth()
                 .signOut()
                 .then(
        function() {
            var ref = firebase.database().ref().child("users");
            $firebaseArray(ref)
                .$loaded()
                .then(function(users) {
                    for (var i=0; i< users.length; i++) {
                        var user = users[i];
                        if ($scope.username == user.username) {
                            var updates = {};
                            updates['/users/' + user.$id + '/loggedIn'] = false;
                            firebase.database().ref().update(updates);
                            break;
                        }
                    }
                    $cookies.put('blocChatCurrentUser', "");
                    $scope.username = "";
                    getUserName($uibModal, $cookies, $firebaseArray);
                })}, 
        function(error) {
        });
         };
                  

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