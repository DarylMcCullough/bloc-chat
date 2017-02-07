(function() {
    function LogIn( Users, $uibModal, $cookies, $log) {
        var LogIn = {};
        
        LogIn.logIn = function() {
            var username = $cookies.get('blocChatCurrentUser');
            if (username != null && username !== "") {
                return;
            }
            
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/templates/getUsername.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.error = "";
                    $scope.username = "";
                    $scope.email = "";
                    $scope.password = "";
            
                    $scope.setError = function(okay, username, err) {
                        if (okay) {
                            $scope.error = "";
                            $uibModalInstance.close(username);
                            return;
                        }
                        $scope.error = err;
                    }
                    $scope.signUp = function () { 
                        var username = $scope.username;
                        var email = $scope.email;
                        var password = $scope.password;
                        var error = $scope.error;
                        var setErr = $scope.setError;
                        Users.signUp(username, email, password, setErr);
                    };
                    
                    $scope.logIn = function () {  
                        var username = $scope.username;
                        var email = $scope.email;
                        var password = $scope.password;
                        var error = $scope.error;
                        var setErr = $scope.setError;
                        Users.logIn(username, email, password, setErr);
                    };
                }
            });
        };
        
        return LogIn;
    }

    angular
        .module('blocChatUtils')
        .factory('LogIn', [ 'Users', '$uibModal', '$cookies', '$log', LogIn]);
})();