(function() {
     function RoomsCtrl($scope, $firebaseArray, Room) {
         this.rooms = Room.all;
     }
 
     angular
         .module('blocChat')
         .controller('RoomsCtrl', ['$scope', '$firebaseArray', 'Room', RoomsCtrl]);
 })();