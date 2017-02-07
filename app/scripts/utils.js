function mySignUp(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    var ref = firebase.database().ref().child("users");
    $firebaseArray(ref)
        .$loaded()
        .then(function(users) {
            for (var i=0; i< users.length; i++) {
                var user = users[i];
                if (username == user.username) {
                    setError("Error: username already taken")
                    return;
                }
                if (email == user.email) {
                    setError("Error: email already taken");
                    return;
                }
            }

            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    var entry = {};
                    entry.username = username;
                    entry.email = email;
                    entry.loggedIn = true;
                    users.$add(entry);
                    $cookies.put('blocChatCurrentUser', username);
                    $uibModalInstance.close(username);
                })
                .catch(function(error) {
                    setError("" + error);
                });
    });
    
}

function myLogIn(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    var ref = firebase.database().ref().child("users");
    $firebaseArray(ref)
        .$loaded()
        .then(function(users) {
            var currentUser = null;
            for (var i=0; i< users.length; i++) {
                var user = users[i];
                if (username == user.username) {
                    if (email == null || email.length == 0 || email == user.email) {
                        email = user.email;
                        currentUser = user;
                        break;
                    }
                    setError("Error: username and email do not match")
                    return;
                }
                if (email == user.email) {
                    if (username == null || username.length == 0) {
                        currentUser = user;
                        username = user.username;
                        break;
                    }
                    setError("Error: username and email do not match");
                    return;
                }
            }
        
            if (currentUser == null) {
                setError("Error: user not found");
                return;
            }

            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(function(user) {
                    var ref = firebase.database().ref();
                    var updates = {};
                    updates['/users/' + currentUser.$id + "/loggedIn"] = true;
                    $cookies.put('blocChatCurrentUser', username);
                    $uibModalInstance.close(username);
                })
                .catch(function(error) {
                    setError("" + error);
                });
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