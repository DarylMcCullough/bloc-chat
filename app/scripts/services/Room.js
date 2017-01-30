(function() {
    function Room($firebaseArray, $log) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);
      
        var msgsRef = firebase.database().ref().child("messages");
        var messages = $firebaseArray(msgsRef);

        return {
            all: rooms,
            getByRoomId: function (roomId) {
                //$log.info("roomId = " + roomId);
                //var msgs2 = msgsRef.orderByChild("roomId").equalTo(roomId);
                //$log.info("msgs2 = " + msgs2);
                //var msgs3 = $firebaseArray(msgs2);
                //$log.info("msgs3 = " + msgs3);
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
        
        };
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', '$log', Room]);
})();