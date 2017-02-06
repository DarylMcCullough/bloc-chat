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

 	angular
        .module('blocChat', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'firebase', 'ngCookies'])
        .config(config)
        .run(['$uibModal', '$cookies', '$firebaseArray', getUserName]);
 })();