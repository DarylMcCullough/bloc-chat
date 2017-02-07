(function() {
    function LogIn( Users, $uibModal, $cookies, $log) {
        var LogIn = {};
        
        LogIn.logIn = function() {
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
                    $scope.error = "";
                    $scope.username = "";
                    $scope.email = "";
                    $scope.password = "";
            
                    $scope.setError = function(okay, username, err) {
                        $log.info("in setError");
                        $log.info("okay: " + okay);
                        $log.info("err: " + err);
                        if (okay) {
                            $scope.error = "";
                            $uibModalInstance.close(username);
                            return;
                        }
                        $scope.error = err;
                        $log.info("now, $scope.error: " + $scope.error);

                    }
                    $scope.signUp = function () { 
                        $log.info("in signUp");
                        $log.info("$scope.error: " + $scope.error);
                        var username = $scope.username;
                        var email = $scope.email;
                        var password = $scope.password;
                        var error = $scope.error;
                        var setErr = $scope.setError;
                        Users.signUp(username, email, password, setErr);
                    };
                    
                    $scope.logIn = function () {  
                        $log.info("in LogIn");
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