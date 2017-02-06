function mySignUp(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);
    var keys = users.$getIndex();
    for (var i=0; i< keys.length; i++) {
        var user = users[keys[i]];
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
}

function myLogIn(setError, username, email, password, $firebaseArray, $cookies, $uibModalInstance) {
    console.log("in myLogIn");
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);
    var keys = users.$getIndex();
    var currentUser = null;
    for (var i=0; i< keys.length; i++) {
        var user = users[keys[i]];
        if (username == user.username) {
            if (email == "") {
                email = user.email;
                currentUser = user;
                break;
            }
            if (email != user.email) {
                setError("Error: that email does not match that username");
                return;
            }
            currentUser = user;
            break;
        }
        if (email == user.email) {
            if (username == "") {
                username = user.username;
                currentUser = user;
                break;
            }
            if (username != user.username) {
                setError("Error: email already taken");
                return;
            }
            currentUser = user;
            break;
        }
    }
    
    if (currentUser == null) {
        setError("Error: email or password not found");
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