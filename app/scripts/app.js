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
     function getUserName($uibModal) {			
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/templates/getUsername.html',
				controller: function($scope, $uibModalInstance) {
                    $scope.ok = function () {
                        $uibModalInstance.close($scope.username);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
                
            });
			modalInstance.result.then(function(x) {
				console.log('Modal dismissed at: ' + new Date());
                console.log('username: ' + x);
                if (x != null && x.length > 0) {
                }
			});
		};
 	angular
        .module('blocChat', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'firebase'])
        .config(config)
        .run(['$uibModal', getUserName]);
 })();