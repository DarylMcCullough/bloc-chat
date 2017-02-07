(function() {
    function Auth( $firebaseArray, $cookies, $log) {        
        
        var Auth = {};
        Auth.signUp = function(email, password) {
            return firebase.auth().createUserWithEmailAndPassword(email, password);
        }
        
        Auth.logIn = function(email, password) {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        }
        
        Auth.logOut = function() {
            firebase.auth().signOut();
        }
        
        return Auth;
    }

    angular
        .module('blocChatUtils')
        .factory('Auth', ['$firebaseArray', '$cookies', '$log', Auth]);
})();