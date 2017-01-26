 (function() {
     function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
         
        $stateProvider
         .state('mainState', {
             url: '/',
             controller: 'MainStateController as MainState',
             templateUrl: '/templates/main.html'
          });
 }
     
angular
    .module('blocJams', ['ui.router', 'firebase']);
    .config(config);
})();