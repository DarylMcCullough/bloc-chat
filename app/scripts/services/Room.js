(function() {
    function Room($firebaseArray, $log) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);
        var msgsRef = firebase.database().ref().child("messages");
        var messages = $firebaseArray(msgsRef);
        
        var Room = {};
        var currentRoom = null;
        Room.currentRoomName = null;
        Room.currentRoomId = null;
        Room.setRoom = function(room) {
            currentRoom = room;
            Room.currentRoomName = room.$value;
            Room.currentRoomId = room.$id;
        }
        
        Room.all = rooms;
        Room.getByRoomId = function(roomId) {
            var msgs = [];
                for (var i=0; i<messages.length; i++) {
                    var message = messages[i];
                    //$log.info(message);
                    //$log.info("message.roomId = " + message.roomId);
                    if (message.roomId == roomId) {
                        msgs.push(message);
                    }
                }
            return msgs;
        }

        return Room;
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', '$log', Room]);
})();