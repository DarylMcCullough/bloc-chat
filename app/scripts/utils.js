function mySignUp(username, email, password, $firebaseArray) {
    var ref = firebase.database().ref().child("rooms");
    
}

function getUserName($uibModal, $cookies, $firebaseArray) {
    var username = $cookies.get('blocChatCurrentUser');
    console.log("username: " + username);
    if (username != null && username !== "") {
        console.log("Current username: " + username);
        return;
    }
    var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/getUsername.html',
        controller: function($scope, $uibModalInstance) {
            $scope.username = username;
            $scope.signUp = function () {

                if ($scope.username == null || $scope.username == "") {
                    return;
                }
                if ($scope.email == null || $scope.email == "") {
                    return;
                }
                if ($scope.password == null || $scope.password == "") {
                    return;
                }
                
                var retval = {};
                retval.username = $scope.username;
                retval.email = $scope.email;
                retval.password = $scope.password;
                retval.action = "signUp";
                //var okay = mySignUp(username, email, password, $firebaseArray);
                var okay = true;
                if (okay) {
                    $uibModalInstance.close(retval);
                } else {
                    alert("not okay");
                }
            };
            $scope.logIn = function () {                
                if ($scope.email == null || $scope.email == "") {
                    return;
                }
                if ($scope.password == null || $scope.password == "") {
                    return;
                }
                
                var retval = {};
                retval.username = $scope.username;
                retval.email = $scope.email;
                retval.password = $scope.password;
                retval.action = "logIn";
                $uibModalInstance.close(retval);
            };
        }

    });
    modalInstance.result.then(function(obj) {
        console.log('Modal dismissed at: ' + new Date());
        var username = obj.username;
        
        var email = obj.email;
        
        var password = obj.password;
        
        var action = obj.action;
        
        if (action == "logIn") {
            logIn(email, password);
        }
        console.log('username: ' + username);
        console.log('email: ' + email);
        console.log("password: " + password);                
        
        if (username != null && username.length > 0) {
            $cookies.put('blocChatCurrentUser', username);
        }
    });
};