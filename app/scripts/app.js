 (function() {
 	function config($stateProvider, $locationProvider) {
 		$locationProvider.html5Mode({
 			enabled: true,
 			requireBase: false
 		});
 		$stateProvider.state('rooms', {
 			url: '/',
 			controller: 'RoomsCtrl as rooms',
 			templateUrl: '/templates/rooms.html'
 		})
 	}
     function getUserName($uibModal, $cookies) {
         var username = $cookies.get('blocChatCurrentUser');
         if (username != null && username !== "") {
             console.log("Current username: " + username);
             return;
         }
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/templates/getUsername.html',
				controller: function($scope, $uibModalInstance) {
                    $scope.ok = function () {
                        if ($scope.username != null && $scope.username !== "") {
                            $uibModalInstance.close($scope.username);
                        }
                    };
                }
                
            });
			modalInstance.result.then(function(x) {
				console.log('Modal dismissed at: ' + new Date());
                console.log('username: ' + x);
                if (x != null && x.length > 0) {
                    $cookies.put('blocChatCurrentUser', x);
                }
			});
		};
 	angular
        .module('blocChat', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'firebase', 'ngCookies'])
        .config(config)
        .run(['$uibModal', '$cookies', getUserName]);
 })();