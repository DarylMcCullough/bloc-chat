(function() {
     function MessagesCtrl($scope, $firebaseArray, $log, Room, Messages) {
         $scope.roomName = "No room selected";
         $scope.currentRoomId = null;
         $scope.messagesDescription = "0 messages";
         $scope.inputOpen = true;
         $scope.otherOpen = false;

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
        
        
        //----------
         $scope.master = {};

      $scope.update = function(msg) {
        var content = msg.content;
        var username = $scope.username;
            var time = new Date();
            var dateString = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + (time.getDate());
            var hours = time.getHours();
            var amPm = "pm"
            if (hours < 12) {
                amPm = "am";
            }
            if (hours > 12) {
                hours -= 12;
            }
            if (hours == 0) {
                hours = 12;
            }
            dateString += " " + hours + ":" + time.getMinutes() + ":" + time.getSeconds();
        
            var room = $scope.currentRoomId;
            Messages.send(username, room, content, dateString);
            msg.content = "";
      };

      $scope.reset = function() {
        $scope.messageToSend = angular.copy($scope.master);
      };

      $scope.reset();
                    
        $scope.update1 = function(msg) {
            
            var content = $scope.master.content;
            var keys = Object.keys($scope);
            for (var i=0; i<keys.length; i++) {
                var key = keys[i];
                var value = $scope[key];
            }
            Messages.send(username, room, content, dateString);
            $scope.messagetoSend = "";

        }
        
        $scope.cancel = function() {
            
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