(function() {
    function Room($firebaseArray, $log) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);
        
        var callbacks = [];
        var notify = function() {
            for (var i=0; i<callbacks.length; i++) {
                callbacks[i].callback();
            }
        }
        
        
        var Room = {};
        var currentRoom = null;
        Room.registerCallback = function(cb, tag) {
            var entry = {
                callback: cb,
                tag: tag
            }
            
            callbacks.push(entry);
        }
        Room.currentRoomName = null;
        Room.currentRoomId = null;
        Room.setRoom = function(room) {
            currentRoom = room;
            Room.currentRoomName = room.$value;
            Room.currentRoomId = room.$id;
            notify();
        }
        
        Room.all = rooms;
        
        Room.addRoom = function(roomName) {
            var rooms = Room.all;
            rooms.$add({ $value: roomName });
        }
        
        return Room;
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', '$log', Room]);
})();