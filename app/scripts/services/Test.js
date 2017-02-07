(function() {
    function Test( $firebaseArray, $cookies, Auth, $log) {
        
        var checkUsernameEmail = function(users, username, email) {
            for (var i=0; i<users.length; i++) {
                var user = users[i];
                if (user.email == email) {
                    return user;
                }
                if (user.username == username) {
                    return user;
                }
            }
            return null;
        };
        
        var Test = {};
        Test.signUp = function(username, email, password, callback) {
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, email);
                    if (user != null) {
                        if (user.username == username) {
                            callback(false, "Error: username exists");
                            return;
                        }
                        if (user.email == email) {
                            callback(false, "Error: email exists");
                            return;
                        }
                    }
                    Auth.signUp(email, password)
                    .then(function(user) {                        
                        var entry = {};
                        entry.username = username;
                        entry.email = email;
                        entry.loggedIn = true;
                        users.$add(entry);
                        $cookies.put('blocChatCurrentUser', username);
                        callback(true, username, "success");
                        return;
                    })
                    .catch(function(error) {
                        callback(false, username, "" + error);
                    });
                }
            );
        };
        
        Test.login = function(username, email, password, callback) {
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, email);
                    if (user == null) {
                        callback(false, username, "Error: user not found");
                        return;
                    }
                    if (email != "" && user.email != email) {
                        callback(false, username, "Error: incorrect email given for that username");
                        return;
                    }
                    if (username != "" && user.username != email) {
                        callback(false, username, "Error: incorrect username given for that email");
                        return;
                    }

                    Auth.signUp(email, password)
                    .then(function(user) {
                        var ref = firebase.database().ref();
                        var updates = {};
                        updates['/users/' + user.$id + "/loggedIn"] = true;
                        $cookies.put('blocChatCurrentUser', username);
                        callback(true, username, "success");
                        return;
                    })
                    .catch(function(error) {
                        callback(false, username, "" + error);
                    });
                }
            );
        };
        
        Test.logout = function(username, callback) {
            Auth.logOut();
            $cookies.put('blocChatCurrentUser', "");
            
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, "");
                    if (user == null) {
                        callback(true, "user not found");
                    }
                    var ref = firebase.database().ref();
                    var updates = {};
                    updates['/users/' + user.$id + "/loggedIn"] = false;
                    callback(true, "success");
                    return;
            });
        };
        
        Test.listOnlineUsers = function(callback) {
            var online = [];
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    for (var i=0; i<users.length; i++) {
                        var user = users[i];
                        if (user.loggedIn == true) {
                            online.append(user);
                        }
                    }
                    callback(online);
                    return;
                });
        };
        
        Test.foo = "Hello";
        
        return Test;
    }

    angular
        .module('blocChatUtils')
        .factory('Test', [ '$firebaseArray', '$cookies', 'Auth', '$log', Test]);
})();