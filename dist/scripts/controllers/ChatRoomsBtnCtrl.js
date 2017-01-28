(function() {
     function ChatRoomsBtnCtrl($scope) {
        $scope.singleModel = 1;
        $scope.greeting = "Howdy";
     }
 
     angular
         .module('blocChat')
         .controller('ChatRoomsBtnCtrl', ['$scope', ChatRoomsBtnCtrl]);
 })();