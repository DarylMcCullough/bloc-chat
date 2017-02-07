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
     
     function foo($uibModal, $cookies, $firebaseArray, LogIn) {
         LogIn.logIn();
     }
    

 	angular
        .module('blocChat', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'firebase', 'ngCookies', 'blocChatUtils'])
        .config(config)
        .run(['$uibModal', '$cookies', '$firebaseArray', 'LogIn', foo]);
 })();