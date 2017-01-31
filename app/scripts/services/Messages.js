(function() {
    function Messages($firebaseArray, $log) {
        var msgsRef = firebase.database().ref().child("messages");           
        
        var Messages = {};


        Messages.getByRoomId = function(roomId) {
            var messages = $firebaseArray(msgsRef);
            console.log("in Messages, number of messages = " + messages.length);
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