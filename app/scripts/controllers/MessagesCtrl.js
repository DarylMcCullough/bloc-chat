//http://plnkr.co/edit/WUKEfcBrSf3XrIQAik67?p=preview
//http://stackoverflow.com/questions/20887536/angular-ui-bootstrap-accordion-collapse-expand-all

(function() {
	var MessagesCtrl = function($scope, $log) {
        $scope.roomName = "Room 1";
		$scope.oneAtATime = true;
		var msg1 = {
            userName: "Fred",
            sentAt: "10/22/2016",
            content: "Hello"
        };
        var msg2 = {
            userName: "John",
            sentAt: "10/23/2016",
            content: "Hi"
        };
        var msg3 = {
            userName: "Jane",
            sentAt: "10/24/2016",
            content: "Howdy"
        };
        $scope.messages = [msg1, msg2, msg3];
        $scope.openAll = function() {        
            for(var i=0; i < $scope.messages.length; i++) {
                var message = $scope.messages[i];
                message.open = true;
            }
        }
        
        $scope.closeAll = function() {
            for(var i=0; i < $scope.messages.length; i++) {
                var message = $scope.messages[i];
                message.open = false;
            }
        }
        $scope.toggle = function(message) {
            if (message.open) {
                if ($scope.oneAtATime) {
                    $scope.closeAll();
                }
                $log.info("now it should be true");
                message.open = true;
            }
        }
	};
	angular.module('blocChat').controller('MessagesCtrl', ['$scope', '$log', MessagesCtrl]);
})();