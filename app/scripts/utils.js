function mySignUp(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);
    for (var i=0; i< users.length; i++) {
        if (username == users[i].username) {
            setError("Error: username already taken")
            return;
        }
        if (email == users[i].email) {
            setError("Error: email already taken");
            return;
        }
    }

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            $cookies.put('blocChatCurrentUser', username);
            $uibModalInstance.close(username);
        })
        .catch(function(error) {
            setError("" + error);
        });
}

function myLogIn(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);
    for (var i=0; i< users.length; i++) {
        if (username == users[i].username) {
            if (email == "") {
                email = users[i].email;
                break;
            }
            if (email != users[i].email) {
                setError("Error: that email does not match that username");
                return;
            }
        }
        if (email == users[i].email) {
            if (username == "") {
                username = users[i].username;
                break;
            }
            if (username != users[i].username) {
                setError("Error: email already taken");
                return;
            }
        }
    }

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
            $cookies.put('blocChatCurrentUser', username);
            $uibModalInstance.close(username);
        })
        .catch(function(error) {
            setError("" + error);
        });
}

function getUserName($uibModal, $cookies, $firebaseArray) {
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
            
            $scope.setError = function(err) {
                $scope.error = err;
            }
                        
            $scope.signUp = function () {                
                var username = $scope.username;
                var email = $scope.email;
                var password = $scope.password;
                var error = $scope.error;

                var setErr = $scope.setError;
                console.log("typeof firebasearray:" + typeof $firebaseArray);
                mySignUp(setErr, username, email, password, $firebaseArray, $cookies, $uibModalInstance);
            };
            $scope.logIn = function () {
                if ($scope.password == null || $scope.password == "") {
                    return;
                }
                
                var username = $scope.username;
                var email = $scope.email;
                var password = $scope.password;
                var error = $scope.error;

                myLogIn($scope.setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance);
            }
        }

    });
};