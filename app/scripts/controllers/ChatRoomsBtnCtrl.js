(function() {
     function ChatRoomsBtnCtrl($scope) {
        $scope.singleModel = 1;
        $scope.greeting = "Howdy";
        $scope.foo = function() {
            alert("hey");
        }
     }
 
     angular
         .module('blocChat')
         .controller('ChatRoomsBtnCtrl', ['$scope', ChatRoomsBtnCtrl]);
 })();