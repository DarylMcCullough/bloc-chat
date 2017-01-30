(function() {
  function Messages($firebaseArray, $log) {
      
    var msgsRef = firebase.database().ref().child("messages");
    var messages = $firebaseArray(msgsRef);

    return {
      getByRoomId: function (roomId) {
          $log.info("roomId = " + roomId);
          //var msgs = [];
          var msgs = msgsRef.orderByChild("roomId").equals(roomId);
          $log.info("msgs = " + msgs);
          for (var i=0; i<messages.length; i++) {
              var message = messages[i];
              $log.info(message);
              $log.info("message.roomId = " + message.roomId);
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
    .factory('Messages', ['$firebaseArray', '$log', Messages]);
})();