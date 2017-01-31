(function() {
    function Messages($firebaseArray, $log) {
        var msgsRef = firebase.database().ref().child("messages");           
        var messages = $firebaseArray(msgsRef);
        
        var Messages = {};

        Messages.getByRoomId = function(roomId) {
            var msgs = [];
                for (var i=0; i<messages.length; i++) {
                    var message = messages[i];
                    if (message.roomId == roomId) {
                        msgs.push(message);
                    }
                }
            return msgs;
        }

        return Messages;
    }

    angular
        .module('blocChat')
        .factory('Messages', ['$firebaseArray', '$log', Messages]);
})();