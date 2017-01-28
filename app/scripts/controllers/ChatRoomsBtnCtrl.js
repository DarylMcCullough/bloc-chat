(function() {
     function ChatRoomsBtnCtrl($scope) {
        $scope.singleModel = 1;
     }
 
     angular
         .module('blocChat')
         .controller('ChatRoomsBtnCtrl', ['$scope', ChatRoomsBtnCtrl]);
 })();